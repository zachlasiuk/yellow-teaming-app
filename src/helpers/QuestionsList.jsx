import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';

import yaml from 'js-yaml';

const fetchYamlData = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return yaml.load(text);
  } catch (error) {
    console.error('Error fetching YAML file:', error);
    return null;
  }
};

const QuestionsList = ({ filePath }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchYamlData(filePath).then((data) => {
      if (data && data.questions) {
        setQuestions(data.questions);
      } else {
        console.error('Invalid YAML data:', data);
      }
    }).catch((error) => console.error('Error processing YAML file:', error));
  }, [filePath]);



  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Questions for reflection
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );

};

export default QuestionsList;