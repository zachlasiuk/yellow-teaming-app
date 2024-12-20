import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Heading,
  Input,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

import MarkdownRenderer from '../../helpers/MarkdownRenderer';
import QuestionsList from '../../helpers/QuestionsList';










function HomeComponent() {


  const [rows, setRows] = React.useState([
    { id: 1, kpi: "", antiKpi: "", rationale: "" },
  ]);

  // Add a new KPI row
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, kpi: "", antiKpi: "", rationale: "" }]);
  };

  // Remove a KPI row
  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };


  return (
    <Box p={4}>
      <Box pb={16}>
        <MarkdownRenderer filePath="/src/markdown_info/success_criteria/kpis/context.md" />
        <br/>
        <QuestionsList filePath="/src/markdown_info/success_criteria/kpis/questions.yaml" />
      </Box>
    <hr/>
    <Box pt={8}>
      <Heading as="h2" size="lg" pb={8} >
        Your Answers
      </Heading>



      <Box p={4} bg="gray.800" color="white" borderRadius="md">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color="white" textAlign="center">#</Th>
            <Th color="white">KPI</Th>
            <Th color="white">Anti-KPI</Th>
            <Th color="white">Rationale</Th>
            <Th color="white" textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => (
            <Tr key={row.id}>
              <Td textAlign="center">
                <Box
                  bg="gray.600"
                  borderRadius="md"
                  width="30px"
                  height="30px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                >
                  {row.id}
                </Box>
              </Td>
              <Td>
                <Input
                  value={row.kpi}
                  onChange={(e) =>
                    handleInputChange(row.id, "kpi", e.target.value)
                  }
                  placeholder="Enter KPI"
                  bg="white"
                  color="black"
                />
              </Td>
              <Td>
                <Input
                  value={row.antiKpi}
                  onChange={(e) =>
                    handleInputChange(row.id, "antiKpi", e.target.value)
                  }
                  placeholder="Enter Anti-KPI"
                  bg="white"
                  color="black"
                />
              </Td>
              <Td>
                <Input
                  value={row.rationale}
                  onChange={(e) =>
                    handleInputChange(row.id, "rationale", e.target.value)
                  }
                  placeholder="Enter Rationale"
                  bg="white"
                  color="black"
                />
              </Td>
              <Td textAlign="center">
                {index > 0 && (
                  <IconButton
                    icon={<MinusIcon />}
                    onClick={() => removeRow(row.id)}
                    colorScheme="red"
                    aria-label="Remove Row"
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        onClick={addRow}
        mt={4}
        leftIcon={<AddIcon />}
        colorScheme="yellow"
        variant="solid"
      >
        + New KPI
      </Button>
    </Box>








    </Box>
  </Box>
  );
}

export default HomeComponent;
