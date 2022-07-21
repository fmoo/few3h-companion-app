import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <View style={styles.container}>
      <Button
        title="Select House"
        onPress={() => {
          navigation.push('ChangeHouse');
        }}
      />
      <Button
        title="Expeditions"
        onPress={() => {
          navigation.push('Expeditions');
        }}
      />
      <Button
        title="Gifts"
        onPress={() => {
          navigation.push('Gifts');
        }}
      />
      <Button
        title="Innate Abilities"
        onPress={() => {
          navigation.push('InnateAbilities');
        }}
      />
      <Button
        title="Supports"
        onPress={() => {
          navigation.push('Supports');
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
