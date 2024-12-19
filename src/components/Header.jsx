import React from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';

function Header() {
  return (
    <Box bg="teal.500" p={4}>
      <Flex alignItems="center">
        <Heading as="h1" size="lg" color="white">
          My App
        </Heading>
        <Spacer />
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