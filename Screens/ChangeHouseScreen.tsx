import { Button, ScrollView, StyleSheet, View, Text } from "react-native";
import { House, useHouse, useChapter, getHouseMetadata } from '../State/Progress';
import Slider from "@react-native-community/slider";

import type { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


function getHouseName(house: House): string {
    switch (house) {
        case House.PROLOGUE:
            return "Prologue";
        case House.BLACK_EAGLES:
            return "Black Eagles";
        case House.BLUE_LIONS:
            return "Blue Lions";
        case House.GOLDEN_DEER:
            return "Golden Deer";
    }
}


function HouseProgress({ house }: { house: House }) {
    const [currentHouse, setHouse] = useHouse();
    const [currentChapter, setChapter] = useChapter();
    if (house !== currentHouse) {
        return null;
    }

    const { minChapter, maxChapter } = getHouseMetadata(currentHouse);

    return <>
        <Slider
            step={1}
            style={styles.houseSlider}
            minimumValue={minChapter}
            maximumValue={maxChapter}
            onValueChange={(value) => {
                console.log(value);
                setChapter(value);
            }}
            value={currentChapter}
        />
        <Text>{currentChapter}</Text>
    </>
}

function HouseButton({ house }: { house: House }) {
    const [currentHouse, setHouse] = useHouse();
    return (
        <>
            <Button
                title={getHouseName(house) + (house == currentHouse ? " ✅" : " ")}
                onPress={() => {
                    setHouse(house);
                }}
            />
            <HouseProgress house={house} />
        </>
    )
}


export default function ChangeHouseScreen({ }: NativeStackScreenProps<RootStackParamList, "Home">) {
    const [house, setHouse] = useHouse();
    return (
        <View style={styles.container}>
            <HouseButton house={House.PROLOGUE} />
            <HouseButton house={House.BLACK_EAGLES} />
            <HouseButton house={House.BLUE_LIONS} />
            <HouseButton house={House.GOLDEN_DEER} />
        </View>
    );
}

const styles = StyleSheet.create({
    houseButtonItem: {

    },
    houseButtonLabel: {

    },
    houseButtonCheck: {

    },
    houseSlider: {
        width: '80%',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
