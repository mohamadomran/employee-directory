import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: {
    light: '#358CFD',
    main: '#0247A2',
    dark: '#01295F',
  },
  white: '#FFFFFF',
  grey: '#858585',
  black: '#0A0A0A',
};

export const theme = extendTheme({ colors });
