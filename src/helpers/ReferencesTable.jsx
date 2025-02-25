import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import yaml from "js-yaml";

const fetchYamlData = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return yaml.load(text);
  } catch (error) {
    console.error("Error fetching YAML file:", error);
    return null;
  }
};

const ReferencesTable = ({ filePath }) => {
  const [references, setReferences] = useState([]);

  useEffect(() => {
    fetchYamlData(filePath)
      .then((data) => {
        if (data && data.references) {
          setReferences(data.references);
        } else {
          console.error("Invalid YAML data:", data);
        }
      })
      .catch((error) => console.error("Error processing YAML file:", error));
  }, [filePath]);

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              References
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Section</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {references.map((reference, index) =>
                  reference.sections.map((section, secIndex) => (
                    <Tr key={`${index}-${secIndex}`}>
                      {secIndex === 0 ? (
                        <>
                          <Td rowSpan={reference.sections.length}>{reference.name}</Td>
                          <Td rowSpan={reference.sections.length}>{reference.type}</Td>
                        </>
                      ) : null}
                      <Td>{section.section}</Td>
                      <Td>{section.title}</Td>
                      <Td>{section.description}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ReferencesTable;
