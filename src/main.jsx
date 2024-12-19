import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import App from './App';
import './index.css';

const colors = {
  brand: {
    900: '#8A9294',
    800: '#000000',
    700: '#E59982',
    600: '#FFD7C1',
    500: '#072083',
    400: '#F85B1A',
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
