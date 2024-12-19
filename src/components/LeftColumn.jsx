import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import SimpleSidebar from './SimpleSidebar';

function LeftColumn() {
  return (
    <Box bg="gray.100" p={4} height="100vh">
      <SimpleSidebar />
      <Text fontSize="xl">Left Column</Text>
      <Text>This area takes up the remaining layout width.</Text>
    </Box>
  );
}

export default LeftColumn;