import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { House, useHouse, useRoster } from '../State/Progress';

import type { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAssets } from 'expo-asset';
import { SpinnerView } from "../Components/Spinners";
import { useEffect, useState } from "react";
import { readString } from 'react-native-csv';

import PapaParse from 'papaparse';
import { useCSV } from "../Util/CSV";

function useHeroGifts(heroId: string) {
    let favorites = null;
    let dislikes = null;

    const allGifts = useCSV(require('../assets/gifts.csv'), 2);
    if (allGifts == null) {
        return [null, null];
    }
    for (const row of allGifts) {
        if (String(row[0]).toLowerCase() == heroId || (heroId == "byleth" && row[0] == "Byleth F")) {
            favorites = row.slice(1, 8).filter(f => f != "none");
            dislikes = row.slice(8).filter(f => f != "none");
        }
    }

    return [favorites, dislikes]
}


export default function HeroGiftsScreen({ route }: NativeStackScreenProps<RootStackParamList, "HeroGifts">) {
    const { heroId } = route.params;

    const [favorites, dislikes] = useHeroGifts(heroId);

    if (favorites == null || dislikes == null) {
        return <SpinnerView />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Likes</Text>
            {favorites.map(g => <Text key={g}>{g}</Text>)}
            <Text style={styles.header}>Dislikes</Text>
            {dislikes.map(g => <Text key={g}>{g}</Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 24,
        // justifyContent: 'center',
    },
    header: {
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
});
