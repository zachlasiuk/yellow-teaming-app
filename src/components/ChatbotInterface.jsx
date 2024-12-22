import React, { useState, useRef } from 'react';
import { Box, Text, VStack, Input, Button, HStack, Flex, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios'; // for API calls
const ChatbotAPI_URL = "https://b8t3hd7x6a.execute-api.us-east-1.amazonaws.com/prod"
const ChatbotAPI_Key__forRateLimiting = "https://b8t3hd7x6a.execute-api.us-east-1.amazonaws.com/prod"



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


  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setIsLoading(true);
  
    try {
      const response = await axios.post(ChatbotAPI_URL, {
        action: 'LLM',
        prompt: message,
      }, {
        headers: { 'x-api-key': ChatbotAPI_Key__forRateLimiting },
      });
  
      setMessages((prev) => [...prev, { text: response.data.body, isUser: false }]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      setMessages((prev) => [...prev, { text: 'Sorry, there was an error. Please try again.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
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
