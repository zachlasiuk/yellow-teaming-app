import React from 'react';
import { Card, CardHeader, CardBody, Grid, Box, Text, Heading, Button, Divider, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, UnorderedList, ListItem } from '@chakra-ui/react';
import { FiDownload, FiExternalLink  } from 'react-icons/fi';


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
      title: 'Better Products',
      description:
        'Create better product-market fit by understanding how all your users are affected by your product.',
    },
    {
      number: 2,
      title: 'Lower Risk',
      description:
        'Lower company risk by walking through Nth-order consequences of product decisions. Avoid costly mistakes before they happen.',
    },
    {
      number: 3,
      title: 'Easier Compliance',
      description:
        'Global regulation is written for lawyers. This framework translates it for a process developers already follow.',
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
        Concillience Project's paper Development in Progress: https://consilienceproject.org/development-in-progress/
        `,
    },
    {
      question: 'Is there an offline version?',
      answer:
        `
        Yes, download the standalone checklist to Yellow Teaming your project locally. The version of the Word checklist will match this online version as this evolves.
        `,
    },
  ];

  const handleDownload = (href) => {
    const link = document.createElement("a");
    link.href = href; // File path provided as argument
    link.download = href.split('/').pop(); // Extract file name from href
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <Box>
      <Box p={4}>
        <Heading as="h1" pb={8} >
          Yellow Teaming - Overview
        </Heading>
        <Text>        
        Yellow Teaming aims to account for how typical approaches to solution design tend to make problems worse in the long run, and provide guidance to address such issues in advance, thereby minimizing the risk of negative externalities.
        This site outlines a step-by-step guide for builders to Yellow Team their product/services. Extra attention is paid to AI usage given its higher positive and negative capabilities.
        </Text>
      </Box>
      <Box padding="4">
        <Heading as="h2" pb={4}>
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
            <Tab>Begin</Tab>
            <Tab>Chat</Tab>
            <Tab>Share</Tab>
          </TabList>
          <TabIndicator mt='-1.5px' height='2px' bg='lightblue' borderRadius='1px' />
          <TabPanels>
            <TabPanel>
              <p>There is no barrier to start Yellow Teaming your product/service now - the concepts add value from concept ideation all the way through testing and deployment.
              The process is highly iterative and project-specific. Look through the Yellow Teaming sections, read how it works, and fill out some answers now. You and your team will likely go through each section a few times as your solution evolves.</p>
              <br />
              <Button leftIcon={<FiDownload />} onClick={() => handleDownload("/yellow-teaming-app/yellow_teaming_checklist.docx")}>
                Download Yellow-Teaming.docx Checklist
              </Button>
            </TabPanel>
            <TabPanel>
              <p>Chat with the public & free Product Assessment GPT to assess your specific product feature's potential consequences. This is a great way to get a sense of the types of questions you should be asking yourself and your team. </p>
                <br />
                <Button leftIcon={<FiExternalLink />} onClick={() => handleDownload("https://chatgpt.com/g/g-67c4716e16288191bda6b706c484adfa-yellowteamgptv2")}>
                  Visit ProductAssessmentGPT
                </Button>
            </TabPanel>
            <TabPanel>
              <p>
                After completing all Yellow Teaming sections, send to your team and stakeholders. This can be used as a:
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
                key={index}
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
