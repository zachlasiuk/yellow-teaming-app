import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Sidebar } from './Sidebar'; // Import Sidebar
import Content from './content/AllContentNavigation'; // Import Content
import { LinkItems } from "./content/AllContentNavigation";

import BackAndNext from "./BackAndNextBtns";

const flattenLinks = (links) => {
  const result = [];
  links.forEach((link) => {
    result.push(link);
    if (link.children?.length > 0) {
      result.push(...link.children);
    }
  });
  return result;
};

function LeftColumn() {
  const [activePage, setActivePage] = useState('Home'); // State for the active page

  // Handle back & next logic
  const flatLinks = flattenLinks(LinkItems);
  const activeIndex = flatLinks.findIndex((link) => link.key === activePage);

  const handleBack = () => {
    if (activeIndex > 0) {
      setActivePage(flatLinks[activeIndex - 1].key);
    }
  };

  const handleNext = () => {
    if (activeIndex < flatLinks.length - 1) {
      setActivePage(flatLinks[activeIndex + 1].key);
    }
  };


  return (
    <Flex height="100vh" direction="row"> {/* Ensure a horizontal layout */}
      {/* Sidebar */}
      <Box width={{ base: 'full', md: '60' }} bg="gray.100">
        
        <Sidebar onSelect={setActivePage} activePage={activePage} />
      </Box>
      
      {/* Content */}
      <Box flex="1" p="4" overflowY="auto">
        <Content activePage={activePage} /> {/* Pass activePage as prop */}
        <BackAndNext
          onBack={handleBack}
          onNext={handleNext}
          showBack={activeIndex > 0}
          showNext={activeIndex < flatLinks.length - 1}
        />
      </Box>
    </Flex>
  );
}

export default LeftColumn;
