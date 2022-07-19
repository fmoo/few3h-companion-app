import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { House, useHouse, useRoster } from '../State/Progress';



import type { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAssets } from 'expo-asset';
import { SpinnerView } from "../Components/Spinners";
import { useEffect, useState } from "react";
import { readString } from 'react-native-csv';



export default function HeroExpeditionScreen({ route }: NativeStackScreenProps<RootStackParamList, "HeroExpedition">) {
    const { heroId } = route.params;
    const [assets, errors] = useAssets([require('../assets/expeditions-qs.csv'), require('../assets/expeditions-talk.csv')]);
    const [heroTalks, setHeroTalks] = useState<Array<string>>(null);
    const [heroQs, setHeroQs] = useState<Array<string>>(null);

    useEffect(
        () => {
            const doFetch = async () => {
                if (errors != null) {
                    console.error(errors);
                    return;
                }
                if (assets == null) {
                    return;
                }

                const [qs, talks] = assets;

                const resp = await fetch(qs.localUri);
                const content = await resp.text();
                const parseResult = readString(content);
                const work = [];
                for (const item of Object.values(parseResult.data)) {
                    const row = item as string[];
                    if (String(row[0]).toLowerCase() == heroId || (heroId == "byleth" && row[0] == "Byleth F")) {
                        work.push(row.slice(2));
                    }
                }
                setHeroQs(work);

                const resp2 = await fetch(talks.localUri);
                const content2 = await resp2.text();
                const parseResult2 = readString(content2);
                const work2 = [];
                for (const item of Object.values(parseResult2.data)) {
                    const row = item as string[];
                    if (String(row[0]).toLowerCase() == heroId || (heroId == "byleth" && row[0] == "Byleth F")) {
                        work2.push(row.slice(2));
                    }
                }
                setHeroTalks(work2);
            }

            doFetch().catch(console.error);
        },
        [assets, heroId],
    );


    if (assets == null || heroQs == null || heroTalks == null) {
        return <SpinnerView />;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} bounces={true}>
            <Text style={styles.header}>Talk</Text>
            {heroTalks.map(g => {
                return (
                    <View key={g[0]} style={styles.promptContainer}>
                        <Text style={styles.prompt}>{g[0]}</Text>
                        <Text style={styles.answer}>{g[2]}</Text>
                    </View>
                );
            })}
            <Text style={styles.header}>Ask a Question</Text>
            {heroQs.map(g => {
                return (
                    <View key={`${g[0]}:${g[2]}`} style={styles.promptContainer}>
                        <Text style={styles.prompt}>{g[0]}</Text>
                        <Text style={styles.prompt2}>{g[2]}</Text>
                        <Text style={styles.answer}>{g[4]}</Text>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    header: {
        fontWeight: '800',
        fontSize: 20,
        marginTop: 16,
        marginBottom: 4,
    },

    promptContainer: {
        marginVertical: 6,
    },

    prompt: {
        fontWeight: '400',
        fontSize: 16,
        marginTop: 4,
        marginBottom: 2,
    },

    prompt2: {
        fontWeight: '400',
        fontSize: 14,
        fontStyle: 'italic',
        marginVertical: 4,
    },

    answer: {
        fontWeight: '600',
        fontSize: 12,
        marginTop: 4,
        marginBottom: 2,
    },

});
