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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon  } from "@chakra-ui/icons";

import MarkdownRenderer from '../../helpers/MarkdownRenderer';
import QuestionsList from '../../helpers/QuestionsList';







function KPIComponent() {


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

      <Box p={4} borderRadius="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>KPI</Th>
              <Th>Anti-KPI</Th>
              <Th>Rationale</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, index) => (
              <Tr key={row.id}>
                <Td textAlign="center">
                  <Box
                    bg="lightgrey"
                    borderRadius="md"
                    width="33px"
                    height="33px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="black4"
                  >
                    <b>{row.id}</b>
                  </Box>
                </Td>
                <Td>
                  <Input
                    value={row.kpi}
                    onChange={(e) =>
                      handleInputChange(row.id, "kpi", e.target.value)
                    }
                    placeholder="Enter KPI"
                  />
                </Td>
                <Td>
                  <Input
                    value={row.antiKpi}
                    onChange={(e) =>
                      handleInputChange(row.id, "antiKpi", e.target.value)
                    }
                    placeholder="Enter Anti-KPI"
                  />
                </Td>
                <Td pr={0}>
                  <Input
                    value={row.rationale}
                    onChange={(e) =>
                      handleInputChange(row.id, "rationale", e.target.value)
                    }
                    placeholder="Enter Rationale"
                  />
                </Td>
                <Td textAlign="center" p={0}>
                  {index > 0 ? (
                    <IconButton
                      icon={<DeleteIcon  />}
                      onClick={() => removeRow(row.id)}
                      variant="outline"
                      aria-label="Remove Row"
                      size="xs" // Makes the button and icon smaller
                    />
                  ) : (
                    <Box width="24px" height="24px" />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      <Box display="flex" justifyContent="space-between" alignItems="left" mt={4}>
      
        <Button
          onClick={addRow}
          leftIcon={<AddIcon />}
          colorScheme="yellow"
          variant="solid"
        >
          New KPI
        </Button>
      </Box>

    </Box>








    </Box>
  </Box>
  );
}

export default KPIComponent;