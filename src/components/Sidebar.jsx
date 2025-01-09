import React, { useState } from "react";
import { Box, Flex, Text, Icon, CloseButton, useColorModeValue } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { LinkItems } from "./content/AllContentNavigation";

export const Sidebar = ({ onSelect, activePage }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSubmenu = (menuName) => {
    setExpandedMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w="full"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Checklist 
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} />
      </Flex>
      {LinkItems.map((link) => (
        <Box key={link.key}>
          <NavItem
            icon={link.icon}
            isExpandable={link.children?.length > 0}
            isExpanded={expandedMenu === link.key}
            isActive={activePage === link.key} // Pass whether this item is active
            onClick={() => {
              if (link.children?.length > 0) {
                toggleSubmenu(link.key);
              } else {
                onSelect(link.key); // Notify parent of selection
              }
            }}
          >
            {link.name}
          </NavItem>
          {expandedMenu === link.key &&
            link.children.map((child) => (
              <NavItem
                key={child.key}
                pl="8"
                isActive={activePage === child.key} // Handle active child items
                onClick={() => onSelect(child.key)}
              >
                {child.name}
              </NavItem>
            ))}
        </Box>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, isExpandable = false, isExpanded = false, isActive = false, pl = 4, ...rest }) => (
  <Box as="a" href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      bg={isActive ? "yellow" : "transparent"} 
      color={isActive ? "black" : "white"}    
      _hover={{
        bg: isActive ? "lightyellow":"lightyellow", // Slightly darker hover for active
        color: "black",
      }}
      pl={pl}
      {...rest}
    >
      {icon && <Icon mr="4" fontSize="16" as={icon} />}
      <Text flex="1">{children}</Text>
      {isExpandable && <ChevronDownIcon transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"} />}
    </Flex>
  </Box>
);
