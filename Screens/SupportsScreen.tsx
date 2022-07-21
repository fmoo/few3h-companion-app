import { ActivityIndicator, Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { House, useHouse, useRoster } from '../State/Progress';

import type { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SpinnerView } from '../Components/Spinners';
import { useEffect, useState } from 'react';
import { readString } from 'react-native-csv';

import { useCSV } from '../Util/CSV';
import { getSupportKey, useSupportState } from '../State/Supports';
import { useSupportsData } from '../Data/Supports';

export default function SupportsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Supports'>) {
  const { getMaxSupportScene } = useSupportsData();
  const { getSupportLevel } = useSupportState();
  const roster = useRoster();

  const counts = {};
  const seen = new Set<string>();
  for (const heroId1 of roster) {
    for (const heroId2 of roster) {
      const heroKey = getSupportKey(heroId1, heroId2);
      if (heroId1 == heroId2) {
        continue;
      }
      if (seen.has(heroKey)) {
        continue;
      }
      seen.add(heroKey);
      // console.log(`${heroKey} - ${getSupportLevel(heroId1, heroId2)} / ${getMaxSupportScene(heroId1, heroId2)}`);
      counts[heroId1] ??= 0;
      counts[heroId2] ??= 0;
      if (getSupportLevel(heroId1, heroId2) != getMaxSupportScene(heroId1, heroId2)) {
        counts[heroId1] += 1;
        counts[heroId2] += 1;
      }
    }
  }

  // console.log(counts);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} bounces={true}>
      {roster.map((heroId) => {
        const needsSupport = counts[heroId] > 0;

        return (
          <Pressable key={heroId} onPress={() => navigation.push('HeroSupports', { heroId })}>
            <View style={[styles.hero, needsSupport ? styles.heroNeedSupports : null]}>
              <Text style={styles.heroName}>{heroId}</Text>
              <Text style={styles.heroSupportsNeeded}>{counts[heroId]}</Text>
            </View>
          </Pressable>
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
    paddingVertical: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  hero: {
    flexDirection: 'row',
    paddingVertical: 8,
    width: '100%',
    justifyContent: 'center',
  },
  heroNeedSupports: {
    backgroundColor: '#ffffe0',
  },
  heroName: {
    marginRight: 8,
  },
  heroSupportsNeeded: {},
  header: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
});
