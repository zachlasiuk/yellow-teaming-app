import React, { useEffect, useState } from 'react';
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
    <ul>
      {questions.map((question, index) => (
        <li key={index}>{question}</li>
      ))}
    </ul>
  );
};

export default QuestionsList;