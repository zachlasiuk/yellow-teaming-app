import React from 'react';
import { Box } from '@chakra-ui/react';

import HomeComponent from './content/HomeComponent';

const ComponentMap = {
  Home: HomeComponent,
  SolutionDetails: () => <Box>Solution Details</Box>,
  Trending1: () => <Box>Trending 1</Box>,
  Trending2: () => <Box>Trending 2</Box>,
  Explore1: () => <Box>Explore 1</Box>,
  Explore2: () => <Box>Explore 2</Box>,
  Favourites: () => <Box>Favourites</Box>,
  Settings: () => <Box>Settings</Box>,
};


function Content({ activePage }) {
    // Get the active component from ComponentMap
    const ActiveComponent = ComponentMap[activePage];
  
    // If the component exists, render it, otherwise show "Page Not Found"
    return ActiveComponent ? <ActiveComponent /> : <Box>Page Not Found</Box>;
  }

export default Content;
