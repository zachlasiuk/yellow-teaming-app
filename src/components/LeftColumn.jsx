import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Sidebar } from './Sidebar'; // Import Sidebar
import Content from './Content'; // Import Content

function LeftColumn() {
  const [activePage, setActivePage] = useState('Home'); // State for the active page

  return (
    <Flex height="100vh" direction="row"> {/* Ensure a horizontal layout */}
      {/* Sidebar */}
      <Box width={{ base: 'full', md: '60' }} bg="gray.100">
        <Sidebar onSelect={setActivePage} />
      </Box>
      
      {/* Content */}
      <Box flex="1" p="4" overflowY="auto">
        <Content activePage={activePage} /> {/* Pass activePage as prop */}
      </Box>
    </Flex>
  );
}

export default LeftColumn;
