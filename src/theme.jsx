import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      },
    }),
  },
  colors: {
    brand: {
      50: '#e3f2f9',
      100: '#c5e4f3',
      200: '#a2d4ec',
      300: '#7ac1e4',
      400: '#47a9da',
      500: '#0088cc',
      600: '#007ab8',
      700: '#006ba1',
      800: '#005885',
      900: '#003f5e',
    },
    // Add more custom colors here
  },
});

export default customTheme;