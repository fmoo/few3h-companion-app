import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import ChangeHouseScreen from './Screens/ChangeHouseScreen';
import HeroExpeditionScreen from './Screens/HeroExpeditionScreen';
import HeroGiftsScreen from './Screens/HeroGiftsScreen';
import ExpeditionsScreen from './Screens/ExpeditionsScreen';
import GiftsScreen from './Screens/GiftsScreen';
import HomeScreen from './Screens/HomeScreen';
import InnateAbilitiesScreen from './Screens/InnateAbilitiesScreen';
import SupportsScreen from './Screens/SupportsScreen';
import HeroSupportsScreen from './Screens/HeroSupportsScreen';
import { useHouseTheme } from './Util/Theme';
import { Platform, UIManager } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  ChangeHouse: undefined;
  Gifts: undefined;
  Expeditions: undefined;
  HeroExpedition: { heroId: string };

  HeroGifts: { heroId: string };
  InnateAbilities: undefined;

  Supports: undefined;
  HeroSupports: { heroId: string };
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const houseTheme = useHouseTheme();
  return (
    <NavigationContainer theme={houseTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChangeHouse" component={ChangeHouseScreen} options={{ title: 'Change House' }} />
        <Stack.Screen name="Expeditions" component={ExpeditionsScreen} />
        <Stack.Screen name="Gifts" component={GiftsScreen} />
        <Stack.Screen name="HeroExpedition" component={HeroExpeditionScreen} options={{ title: 'Expedition' }} />
        <Stack.Screen name="HeroGifts" component={HeroGiftsScreen} options={{ title: 'Gifts' }} />
        <Stack.Screen
          name="InnateAbilities"
          component={InnateAbilitiesScreen}
          options={{ title: 'Innate Abilities' }}
        />
        <Stack.Screen name="Supports" component={SupportsScreen} />
        <Stack.Screen name="HeroSupports" component={HeroSupportsScreen} options={{ title: 'Hero Supports' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
