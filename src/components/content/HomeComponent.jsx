import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import MarkdownRenderer from '../../helpers/MarkdownRenderer';
import QuestionsList from '../../helpers/QuestionsList';

function HomeComponent() {
  return (


    
    <Box p={4}>
      <MarkdownRenderer filePath="/src/markdown_info/success_criteria/kpis/context.md" />
      <QuestionsList filePath="/src/markdown_info/success_criteria/kpis/questions.yaml" />

    </Box>
  );
}

export default HomeComponent;
