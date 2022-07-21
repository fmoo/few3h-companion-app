import { Theme } from '@react-navigation/native';
import { isNonNullChain } from 'typescript';
import { House, useHouse } from '../State/Progress';

const DEFAULT_THEME = {
  dark: false,
  colors: {
    background: 'white',
    primary: 'black',
    border: 'black',
    card: 'white',
    notification: 'ping',
    text: 'black',
  },
};

export function useHouseTheme(): Theme {
  const [house] = useHouse();

  switch (house) {
    case House.PROLOGUE:
    case House.UNSET:
      return DEFAULT_THEME;

    case House.BLACK_EAGLES:
      return {
        dark: false,
        colors: {
          background: '#ffcccb',
          primary: '#800000',
          border: '#800000',
          card: '#ffcccb',
          notification: 'green',
          text: 'black',
        },
      };

    case House.BLUE_LIONS:
      return {
        dark: false,
        colors: {
          background: '#D7E5F0',
          primary: '#000080',
          border: '#000080',
          card: '#D7E5F0',
          notification: 'green',
          text: 'black',
        },
      };

    case House.GOLDEN_DEER:
      return {
        dark: false,
        colors: {
          background: '#ffffbf',
          primary: '#bf6700',
          border: '#bff700',
          card: '#ffffcf',
          notification: 'green',
          text: 'black',
        },
      };
  }
}
