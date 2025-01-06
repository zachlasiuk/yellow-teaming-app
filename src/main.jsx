import React from 'react';

import { createRoot } from "react-dom/client";
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import './index.css';
import customTheme from './theme'; // Import a custom theme

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

