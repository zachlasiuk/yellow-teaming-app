import React, { useState } from "react";
import {
  Box,
  Heading,
  Checkbox,
  Grid,
  GridItem,
  Text,
  Link,
  Divider
} from "@chakra-ui/react";

import MarkdownRenderer from "../../helpers/MarkdownRenderer";
import QuestionsList from "../../helpers/QuestionsList";
import ReferencesTable from "../../helpers/ReferencesTable";

function StandardsComponent() {
  // Define checkbox sections
  const checkboxCategories = [
    {
      column: "Regulatory Standards",
      sections: [
        {
          section: "Government Policies",
          options: [
            { label: "GDPR Compliance", id: "gdpr", link: "https://gdpr.eu/" },
            { label: "CCPA Regulations", id: "ccpa", link: "https://oag.ca.gov/privacy/ccpa" },
          ],
        },
        {
          section: "AI Ethics Guidelines",
          options: [
            { label: "EU AI Act", id: "eu_ai_act", link: "https://ec.europa.eu/ai-act" },
            { label: "IEEE AI Ethics", id: "ieee_ai_ethics", link: "https://ethicsinaction.ieee.org/" },
          ],
        },
      ],
    },
    {
      column: "Technical Standards",
      sections: [
        {
          section: "General AI Guidelines",
          options: [
            { label: "NIST AI Framework", id: "nist_ai", link: "https://www.nist.gov/ai" },
            { label: "ISO/IEC 42001 AI Standard", id: "iso_ai", link: "https://www.iso.org/standard/81230.html" },
          ],
        },
        {
          section: "Healthcare",
          options: [
            { label: "HIPAA Compliance", id: "hipaa", link: "https://www.hhs.gov/hipaa/" },
            { label: "FHIR Standard", id: "fhir", link: "https://www.hl7.org/fhir/" },
          ],
        },
      ],
    },
  ];

  // Initialize state correctly for each checkbox
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    checkboxCategories.reduce(
      (acc, category) =>
        category.sections.reduce(
          (sectionAcc, section) =>
            section.options.reduce(
              (optionAcc, option) => ({ ...optionAcc, [option.id]: false }),
              sectionAcc
            ),
          acc
        ),
      {}
    )
  );

  // Handle checkbox toggle
  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    setSelectedCheckboxes((prev) => {
      const updatedState = { ...prev, [id]: isChecked };
      console.log("Checkbox Updated:", updatedState); // Debugging log
      return updatedState;
    });
  };

  return (
    <Box p={4}>
      <Box pb={8} className="markdown-info">
        <MarkdownRenderer filePath={`${import.meta.env.BASE_URL}markdown_info/success_criteria/standards/context.md`} />
        <br />
        <QuestionsList filePath={`${import.meta.env.BASE_URL}markdown_info/success_criteria/standards/questions.yaml`} />
        <br />
        <ReferencesTable filePath={`${import.meta.env.BASE_URL}markdown_info/success_criteria/standards/references.yaml`} />
      </Box>
      <hr />
      <Box pt={4}>
        <Heading as="h2" size="lg" pb={8}>
          Your Answers
        </Heading>

        {/* Checkboxes with Headers, Sections, and Links */}
        <Box p={4} borderRadius="md">
          <Grid templateColumns="repeat(2, 1fr)" gap={10}>
            {checkboxCategories.map((category) => (
              <GridItem key={category.column}>
                <Heading as="h3" size="md" pb={4}>
                  {category.column}
                </Heading>

                {category.sections.map((section) => (
                  <Box key={section.section} pb={4}>
                    <Text fontWeight="bold" pb={2}>
                      {section.section}
                    </Text>
                    {section.options.map((option) => (
                      <Checkbox
                        key={option.id}
                        isChecked={selectedCheckboxes[option.id] || false}
                        onChange={(e) => handleCheckboxChange(e, option.id)}
                        pb={1}
                      >
                        <Link href={option.link} isExternal color="blue.500">
                          {option.label}
                        </Link>
                      </Checkbox>
                    ))}
                    <Divider mt={3} />
                  </Box>
                ))}
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default StandardsComponent;
