import React from 'react';
import { Box, Flex, Heading, Spacer, Button, IconButton, useColorMode } from '@chakra-ui/react';

import { SunIcon, MoonIcon, ChatIcon } from '@chakra-ui/icons'; 


function Header({ toggleRightColumn }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg="teal.500" p={4}>
      <Flex alignItems="center">
        <Heading as="h1" size="lg" color="white">
          My App
        </Heading>
        <Spacer />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          mr={4}
        />
        <IconButton
          aria-label="Toggle right column"
          icon={<ChatIcon />}
          onClick={toggleRightColumn}
          mr={4}
        />
        <Button colorScheme="teal" variant="outline" mr={4}>
          Sign In
        </Button>
        <Button colorScheme="teal" variant="solid">
          Sign Up
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;