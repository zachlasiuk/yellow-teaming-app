import React from 'react';
import { Box, Flex, Heading, Spacer, Button, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { SunIcon, MoonIcon, ChatIcon } from '@chakra-ui/icons'; 

import LogInterest from './LogInterest';

function Header({ toggleRightColumn }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const headingBgColor = useColorModeValue('white', 'black1');

  return (
    <Box bg={headingBgColor} p={4}>
      <Flex alignItems="center">
        <Heading as="h1" size="lg" >
          Yellow Teaming App
        </Heading>
        <Spacer />
        {/*
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          variant="outline"
          onClick={toggleColorMode}
          mr={4}
        />
        */}
        <IconButton
          aria-label="Toggle right column"
          icon={<ChatIcon />}
          variant="outline"
          onClick={toggleRightColumn}
          mr={4}
        />
        <LogInterest mr={4} triggerText="Note your Interest" modalTitle="Signal your interest to our team" />
      </Flex>
    </Box>
  );
}

export default Header;


