import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import ChangeHouseScreen from './Screens/ChangeHouseScreen';
import HeroExpeditionScreen from './Screens/HeroExpeditionScreen';
import HeroGiftsScreen from './Screens/HeroGiftsScreen';
import ExpeditionsScreen from './Screens/ExpeditionsScreen';
import GiftsScreen from './Screens/GiftsScreen';
import HomeScreen from './Screens/HomeScreen';
import InnateAbilitiesScreen from './Screens/InnateAbilitiesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined,
  ChangeHouse: undefined,
  Gifts: undefined,
  Expeditions: undefined,
  HeroExpedition: { heroId: string },
  
  HeroGifts: { heroId: string },
  InnateAbilities: undefined,
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChangeHouse" component={ChangeHouseScreen} options={{ title: 'Change House' }} />
        <Stack.Screen name="Expeditions" component={ExpeditionsScreen} />
        <Stack.Screen name="Gifts" component={GiftsScreen} />
        <Stack.Screen name="HeroExpedition" component={HeroExpeditionScreen} options={{ title: 'Expedition' }} />
        <Stack.Screen name="HeroGifts" component={HeroGiftsScreen} options={{ title: 'Gifts' }} />
        <Stack.Screen name="InnateAbilities" component={InnateAbilitiesScreen} options={{title: 'Innate Abilities'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

