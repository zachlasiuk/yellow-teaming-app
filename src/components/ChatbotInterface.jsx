import React, { useState, useRef, useEffect, useCallback  } from 'react';
import { Box, Text, VStack, Input, Button, HStack, Flex, Spinner, useColorModeValue } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'; 
import axios from 'axios'; // for API calls



const ChatbotAPI_URL = import.meta.env.VITE_RESTAPI_URL;
const ChatbotAPI_Key__forRateLimiting = import.meta.env.VITE_PUBLIC_API_KEY;



const ChatMessage = ({ message, isUser }) => {
  const userBg = useColorModeValue("blue", "lightblue");
  const botBg = useColorModeValue("lightgrey", "black2");
  const userColor = useColorModeValue("white", "black");
  const botColor = useColorModeValue("black", "white");

  return (
    <Flex 
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      width="100%" 
    >
      <Box
        bg={isUser ? userBg : botBg}
        color={isUser ? userColor : botColor}
        p={3}
        borderRadius="md"
        maxW="90%"
        mb={2}
        textAlign={isUser ? 'right' : 'left'}
      >
        {message}
      </Box>
    </Flex>
  );
};

const InputBar = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) { // only send when chatbot not activly thinking
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
        isDisabled={isLoading}
      />
      <Button
        bg={useColorModeValue("yellow", "darkyellow")}
        color={useColorModeValue("black", "white")}
        onClick={handleSend}
        isLoading={isLoading}
        loadingText="Sending"
      >
        Send
      </Button>
    </HStack>
  );
};


const ChatbotInterface = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = sessionStorage.getItem('chatMessages');
      return savedMessages ? JSON.parse(savedMessages) : [{ text: 'Hello! How can I assist you today?', isUser: false }];
    } catch (error) {
      console.error('Failed to load messages from session storage:', error);
      return [{ text: 'Hello! How can I assist you today?', isUser: false }];
    }
  });
  


  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  //const scrollToBottom = useCallback(() => {
  //  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  //}, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth',       block: 'end' });
    }
  };


  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom whenever messages update
    
    const timeout = setTimeout(() => {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    }, 500); // Save after 500ms of no new messages
    return () => clearTimeout(timeout);
  }, [messages]);
  


  const handleSendMessage = async (message) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setIsLoading(true);
  
    try {
      const response = await axios.post(ChatbotAPI_URL, {
        action: 'LLM',
        prompt: message,
      }, {
        headers: {
          'Content-Type': 'application/json', 
          'x-api-key': ChatbotAPI_Key__forRateLimiting },
      });
  
      setMessages((prev) => [
        ...prev, 
        { text: response.data.body, isUser: false }]);


        
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      const errorMessage =
        error.response?.status === 429
          ? 'You"ve hit the rate limit. Please wait and try again.'
          : 'Sorry, there was an error. Please try again later.';
      setMessages((prev) => [
        ...prev,
        { text: errorMessage, isUser: false },
      ]);
    }
    finally {
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
        {isLoading && (
          <Flex justifyContent="center" alignItems="center" width="100%">
            <Spinner size="md" />
          </Flex>
        )}
        <div ref={messagesEndRef} />
      </VStack>
      <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
    </Box>

  );
};



export default ChatbotInterface;
