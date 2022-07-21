import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { House, useHouse, useRoster } from '../State/Progress';

import type { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAssets } from 'expo-asset';
import { SpinnerView } from '../Components/Spinners';
import { useEffect, useState } from 'react';
import { readString } from 'react-native-csv';
import { useCSV } from '../Util/CSV';

function useExpeditions(heroId: string) {
  const qRows = useCSV(require('../assets/expeditions-qs.csv'), 2);
  const talkRows = useCSV(require('../assets/expeditions-talk.csv'), 2);
  const qs = [];
  const talks = [];

  if (qRows != null) {
    for (const row of qRows) {
      if (String(row[0]).toLowerCase() == heroId || (heroId == 'byleth' && row[0] == 'Byleth F')) {
        qs.push(row.slice(2));
      }
    }
  }

  if (talkRows != null) {
    for (const row of talkRows) {
      if (String(row[0]).toLowerCase() == heroId || (heroId == 'byleth' && row[0] == 'Byleth F')) {
        talks.push(row.slice(2));
      }
    }
  }

  return {
    qs,
    talks,
  };
}

export default function HeroExpeditionScreen({ route }: NativeStackScreenProps<RootStackParamList, 'HeroExpedition'>) {
  const { heroId } = route.params;
  const [assets, errors] = useAssets([
    require('../assets/expeditions-qs.csv'),
    require('../assets/expeditions-talk.csv'),
  ]);
  const { qs, talks } = useExpeditions(heroId);

  if (assets == null) {
    return <SpinnerView />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} bounces={true}>
      <Text style={styles.header}>Talk</Text>
      {talks.map((g) => {
        return (
          <View key={g[0]} style={styles.promptContainer}>
            <Text style={styles.prompt}>{g[0]}</Text>
            <Text style={styles.answer}>{g[2]}</Text>
          </View>
        );
      })}
      <Text style={styles.header}>Ask a Question</Text>
      {qs.map((g) => {
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
