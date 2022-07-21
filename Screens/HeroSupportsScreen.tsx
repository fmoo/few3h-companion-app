import { ActivityIndicator, Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { House, useHouse, useRoster } from '../State/Progress';

import type { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SpinnerView } from '../Components/Spinners';
import { useEffect, useState } from 'react';

import { getSupportKey, useSupportState } from '../State/Supports';
import { useSupportsData } from '../Data/Supports';

export default function HeroSupportsScreen({ route }: NativeStackScreenProps<RootStackParamList, 'HeroSupports'>) {
  const { heroId } = route.params;
  const { getMaxSupportScene, getMaxSupportLevel } = useSupportsData();
  const { getSupportLevel, setSupportLevel } = useSupportState();
  const roster = useRoster();

  const counts = {};
  const seen = new Set<string>();
  for (const heroId2 of roster) {
    const heroKey = getSupportKey(heroId, heroId2);
    if (heroId == heroId2) {
      continue;
    }
    if (seen.has(heroKey)) {
      continue;
    }
    seen.add(heroKey);
    counts[heroId2] ??= 0;
    if (getSupportLevel(heroId, heroId2) != getMaxSupportScene(heroId, heroId2)) {
      counts[heroId2] += 1;
    }
  }

  // console.log(counts);

  function cycleSupportLevel(heroId2: string) {
    const currentValue = getSupportLevel(heroId, heroId2);
    const maxLevel = getMaxSupportLevel(heroId, heroId2);
    if (currentValue == '') {
      setSupportLevel(heroId, heroId2, 'C');
    } else if (currentValue == 'C') {
      if (maxLevel == 'C') {
        setSupportLevel(heroId, heroId2, '');
      } else {
        setSupportLevel(heroId, heroId2, 'B');
      }
    } else if (currentValue == 'B') {
      if (maxLevel == 'B') {
        setSupportLevel(heroId, heroId2, '');
      } else {
        setSupportLevel(heroId, heroId2, 'A');
      }
    } else if (currentValue == 'A') {
      setSupportLevel(heroId, heroId2, '');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} bounces={true}>
      {roster.map((heroId2) => {
        if (heroId2 == heroId) {
          return null;
        }

        const maxSupportScene = getMaxSupportScene(heroId, heroId2);
        const noSupports = maxSupportScene == '';
        const supportLevel = getSupportLevel(heroId, heroId2);
        const needsSupport = supportLevel != maxSupportScene;

        return (
          <Pressable key={heroId2} onPress={() => cycleSupportLevel(heroId2)}>
            <View
              style={[
                styles.hero,
                noSupports ? styles.heroNoSupports : null,
                needsSupport && !noSupports ? styles.heroNeedSupports : null,
              ]}
            >
              <Text style={[styles.heroName, noSupports ? styles.heroTextNoSupports : null]}>{heroId2}</Text>
              <Text style={[styles.supportLevel, noSupports ? styles.heroTextNoSupports : null]}>
                {supportLevel} / {getMaxSupportLevel(heroId, heroId2)}
              </Text>
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
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  heroNoSupports: {
    backgroundColor: '#eee',
  },
  heroNeedSupports: {
    backgroundColor: '#ffffe0',
  },
  heroName: {
    marginRight: 8,
  },
  heroTextNoSupports: {
    color: '#111',
  },
  supportLevel: {},
  header: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
});
