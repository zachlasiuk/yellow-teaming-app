import React from 'react';
import { Card, CardHeader, CardBody, Grid, Box, Text, Heading, Divider, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, UnorderedList, ListItem } from '@chakra-ui/react';
import { FiAward } from 'react-icons/fi';


const CustomCard = ({ number, title, description }) => (
  <Card boxShadow="lg" padding="4">
    <CardHeader display="flex" flexDirection="row" alignItems="start" marginBottom="4">
      <Box marginRight="4"
        flexShrink="0"
        textAlign="left"
        border="1px"
        borderRadius={5}
      >
        <Text
          marginLeft={1}
          marginRight={1}
          fontSize="2xl"
          fontWeight="bold"
        >
          {number}
        </Text>
      </Box>
      <Box>
        <Text fontSize="2xl" fontWeight="semibold" height="40px" wordBreak="break-word">
          {title}
        </Text>
      </Box>
    </CardHeader>
    <CardBody>
      <Text >
        {description}
      </Text>
    </CardBody>
  </Card>
);



const FAQ = ({ question, answer }) => (
<Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {question}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {answer}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
);



function HomeComponent() {

  const cards = [
    {
      number: 1,
      title: 'Increased ROI',
      description:
        'Preempt costly mistakes by systematically considering Nth order impacts of product decisions. Mitigate harms to your company before they happen.',
    },
    {
      number: 2,
      title: 'Responsible Tech',
      description:
        'An actionable process to build agentic, responsible technology.',
    },
    {
      number: 3,
      title: 'Consistent Compliance',
      description:
        'Get a checklist. Each item linked to specific legislation sections. Translated to developer language.',
    },
  ];

  const faqs_home = [
    {
      question: 'What is difference from red teaming?',
      answer:
        `
        The Yellow Teaming concept was inspired by the well-established Red Teaming cyber-security practice. 
        Technologists form a 'Red Team' to understand what happens when a product is exploited - they explore possible attack pathways and product vulnerabilities. The results are security reports and product changes to prevent the product from failing. The 'Red Team' members step out of their normal roles and take on the mentality of a hacker or other bad actor.
        Similarly, technologists can form a 'Yellow Team' to explore what happens when a product works exactly as intended - assessing what unexpected and unintended harms arise for your users, your company, our society, and our environment. The results are a externalities report and product changes to minimize these harms. The 'Yellow Team' members take on wide system-level view of a anthropologist, sociologist, company executive, and more.
        `,
    },
    {
      question: 'Where did this concept come from?',
      answer:
        `
        Concillience Project, etc, lots of places.
        `,
    },
    {
      question: 'How are you using my data?',
      answer:
        `
        Concillience Project, etc, lots of places.
        `,
    },
    {
      question: 'Is there an offline version?',
      answer:
        `
        Yes, as a standalone checklist you can fill out. The version of the Word checklist will match this online version as this evolves.
        `,
    },
  ];


  return (
    <Box>
      <Box p={4}>
        <Heading as="h1" pb={8} >
          What is Yellow Teaming?
        </Heading>
        <Text>        
        Yellow Teaming aims to account for how typical approaches to solution design tend to make problems worse in the long run, and provide guidance to address such issues in advance, thereby minimizing the risk of negative externalities.
        This site outlines a step-by-step guide for builders to Yellow Team their product/services. Extra attention is paid to AI usage given its higher positive and negative capabilities.
        </Text>
      </Box>
      <Box padding="4">
        <Heading>
          What are the benefits to Yellow Teaming?
        </Heading>
        <Text pb={4}>
          Not just to feel good. Net-positive solutions are beneficial to your company's bottom line.
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap="6">
          {cards.map((card, index) => (
            <CustomCard
              key={index}
              number={card.number}
              title={card.title}
              description={card.description}
            />
          ))}
        </Grid>
      </Box>

      <Box padding="4">
        <Heading as="h2" mb={8} mt={4}>
          How to use Yellow Teaming?
        </Heading>
        <Tabs isFitted variant='enclosed'>
          <TabList>
            <Tab>Begin & Iterate</Tab>
            <Tab>Learn & Chat</Tab>
            <Tab>Download & Share</Tab>
          </TabList>
          <TabIndicator mt='-1.5px' height='2px' bg='lightblue' borderRadius='1px' />
          <TabPanels>
            <TabPanel>
              <p>There is no barrier to start Yellow Teaming your product/service now - the concepts add value from concept ideation all the way through testing and deployment.
              The process is highly iterative and project-specific. Look through the Yellow Teaming sections, read how it works, and fill out some answers now. You and your team will likely go through each section a few times as your solution evolves.</p>
            </TabPanel>
            <TabPanel>
              <p>
                There are several resources to help you get the most out of your Yellow Teaming. Each section has examples of how existing products approached their Yellow Team. 
                There is also a LLM-based chatbot that can take two personas: 
                (1) Tarra the Teacher - Tarra is tuned to help you along your Yellow Teaming process. Ask it to explain new terms, provide examples, brainstorm ideas, and more. 
                (2) Claire the Compliance expert - Claire is a RAG-based chatbot that you can ask specific questions about key AI legistlation, currently including the EU AI Act and USA NIST AI Playbook. Use it to 'talk' to the legislation to understand how to comply with the letter and spirit of the law.
                </p>
            </TabPanel>
            <TabPanel>
              <p>
                After completing all Yellow Teaming sections, you can export a PDF of your answers that you can use in a multitude of ways:
                - Compliance backstop: A hard resource for your business to refer to if asked to prove compliance with global tech legislation.
                - Build trust: Share your Yellow Teaming activities publically to your business customers and/or end-users. This demonstrates you are putting in a good-faith effort to build responsible technology that takes steps to not exploit or decive people.
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Box padding="4">
        <Heading as="h2" pb={4}>
          FAQs
        </Heading>
        <Box>
        {faqs_home.map((faq, index) => (
              <FAQ
                question={faq.question}
                answer={faq.answer}
              />
            ))}

        </Box>

      </Box>
   </Box>
  );
}

export default HomeComponent;
