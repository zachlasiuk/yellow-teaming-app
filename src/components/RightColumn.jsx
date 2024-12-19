import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function RightColumn() {
  return (
    <Box bg="gray.200" p={4} height="100vh">
      <Text fontSize="xl">Right Column</Text>
      <Text>This area takes up 1/4 of the layout width.</Text>
    </Box>
  );
}

export default RightColumn;