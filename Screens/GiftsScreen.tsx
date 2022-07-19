import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { House, useHouse, useRoster } from '../State/Progress';

import type { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export default function GiftsScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
    const roster = useRoster();
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} bounces={true}>
            {roster.map(hero => {
                if (hero == "shez") {
                    return null;
                }
                return <Button key={hero} title={hero} onPress={() => {
                    navigation.push("HeroGifts", { heroId: hero })
                }} />
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    contentContainer: {
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
