import React, { useState, useRef } from 'react';
import { Box, Text, VStack, Input, Button, HStack, Flex, useColorModeValue } from '@chakra-ui/react';

const ChatMessage = ({ message, isUser }) => {
  const userBg = useColorModeValue("blue", "lightblue");
  const botBg = useColorModeValue("lightgrey", "black2");
  const userColor = useColorModeValue("white", "black");
  const botColor = useColorModeValue("black", "white");

  return (
    <Flex justifyContent={isUser ? 'flex-end' : 'flex-start'}>
      <Box
        bg={isUser ? userBg : botBg}
        color={isUser ? userColor : botColor}
        p={3}
        borderRadius="md"
        maxW="90%"
        mb={2}
      >
        {message}
      </Box>
    </Flex>
  );
};

const InputBar = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <HStack
      spacing={2}
      p={4}
      bg={useColorModeValue("lightgrey", "black2")}
      borderTop="1px solid"
      borderColor={useColorModeValue("darkgrey", "black3")}
      position="sticky"
      bottom="0"
      width="100%"
      zIndex="10"
    >
      <Input
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        flex={1}
      />
      <Button bg={useColorModeValue("yellow", "darkyellow")} color={useColorModeValue("black", "white")} onClick={handleSend}>
        Send
      </Button>
    </HStack>
  );
};

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', isUser: false },
  ]);

  const messagesEndRef = useRef(null);

  const handleSendMessage = (message) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);

    // Simulating chatbot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: 'Thank you for your message!', isUser: false }]);
    }, 1000);
  };

  return (
    <Box bg={useColorModeValue("lightgrey", "black2")} height="100vh" display="flex" flexDirection="column">
      <Text fontSize="xl" mb={4} p={4} bg={useColorModeValue("yellow", "darkyellow")} color={useColorModeValue("black", "white")} textAlign="center">
        Chatbot Interface
      </Text>
      <VStack
        flex={1}
        spacing={4}
        overflowY="auto"
        p={4}
        borderRadius="md"
        borderWidth="1px"
        borderColor={useColorModeValue("darkgrey", "black3")}
        bg={useColorModeValue("white", "black1")}
        width="100%"
        justifyContent="flex-start"
      >
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
        ))}
        <div ref={messagesEndRef} />
      </VStack>
      <InputBar onSendMessage={handleSendMessage} />
    </Box>
  );
};

export default ChatbotInterface;
