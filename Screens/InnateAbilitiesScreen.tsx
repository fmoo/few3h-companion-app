import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { House, useHouse, useRoster } from '../State/Progress';

import type { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useInnateAbilities } from '../Util/CSV';
import { backgroundColor } from '../Util/Theme';

export default function InnateAbilitiesScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'InnateAbilities'>) {
  const roster = useRoster();
  const innateAbilities = useInnateAbilities();

  if (innateAbilities == null) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} bounces={true}>
      {roster.map((hero) => {
        const innateAbility = innateAbilities[hero];
        if (innateAbility == null) {
          console.log(`No innate for ${hero}`);
          return null;
        }
        const { ability, job, description } = innateAbility;
        return (
          <View style={styles.hero} key={hero}>
            <Text style={styles.heroName}>{hero}</Text>
            <Text style={styles.jobName}>{job}</Text>
            <Text style={styles.abilityName}>{ability}</Text>
            <Text style={styles.abilityDescription}>{description}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
  contentContainer: {},
  hero: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  heroName: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '33%',
  },
  jobName: {
    textAlign: 'center',
    width: '33%',
  },
  abilityName: {
    textAlign: 'center',
    width: '33%',
  },
  abilityDescription: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 4,
    // minWidth: '100%',
  },
});
