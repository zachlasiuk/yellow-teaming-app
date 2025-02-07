import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Box,
  Heading,
  Text,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';

const ChakraUIRenderer = {
  h1: ({ children }) => <Heading as="h1" size="2xl" my={4}>{children}</Heading>,
  h2: ({ children }) => <Heading as="h2" size="xl" my={4}>{children}</Heading>,
  h3: ({ children }) => <Heading as="h3" size="lg" my={4}>{children}</Heading>,
  p: ({ children }) => <Text my={2}>{children}</Text>,
  a: ({ href, children }) => <Link href={href} color="teal.500">{children}</Link>,
  ul: ({ children }) => <List styleType="disc" pl={12} my={2}>{children}</List>,
  ol: ({ children }) => <List styleType="decimal" pl={12} my={2}>{children}</List>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  blockquote: ({ children }) => <Box as="blockquote" pl={4} borderLeft="4px" borderColor="gray.200" my={4}>{children}</Box>,
};

const MarkdownRenderer = ({ filePath }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => {
        console.log('Content File path: ',filePath);
        console.log('Fetched markdown content:', text);
        setContent(text);
      })
      .catch((error) => console.error('Error fetching markdown file:', error));
  }, [filePath]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={ChakraUIRenderer}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;