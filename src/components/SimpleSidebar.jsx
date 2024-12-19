'use client';

import React, { useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';

// Define LinkItems with name and icon
const LinkItems = [
  {
    name: 'Home',
    icon: FiHome,
    key: 'Home', // Key for ComponentMap
    children: [], // No submenus
  },
  {
    name: 'Trending',
    icon: FiTrendingUp,
    key: 'Trending', // Not clickable
    children: [
      { name: 'Trending 1', key: 'Trending1' },
      { name: 'Trending 2', key: 'Trending2' },
    ],
  },
  {
    name: 'Explore',
    icon: FiCompass,
    key: 'Explore', // Not clickable
    children: [
      { name: 'Explore 1', key: 'Explore1' },
      { name: 'Explore 2', key: 'Explore2' },
    ],
  },
  {
    name: 'Favourites',
    icon: FiStar,
    key: 'Favourites',
    children: [], // No submenus
  },
  {
    name: 'Settings',
    icon: FiSettings,
    key: 'Settings',
    children: [],
  },
];


// Components for each menu option
const HomeComponent = () => <Text fontSize="xl">Welcome to Home!</Text>;
const Trending1Component = () => <Text fontSize="xl">Check out what's trending!11111111</Text>;
const Trending2Component = () => <Text fontSize="xl">Check out what's trending!22222</Text>;

const Explore1Component = () => <Text fontSize="xl">Explore the world!111</Text>;
const Explore2Component = () => <Text fontSize="xl">Explore the world!222</Text>;

const FavouritesComponent = () => <Text fontSize="xl">Your favourite items are here!</Text>;
const SettingsComponent = () => <Text fontSize="xl">Adjust your settings here.</Text>;

// Map component to menu name
const ComponentMap = {
  Home: HomeComponent,
  Trending1: Trending1Component,
  Trending2: Trending2Component,
  Explore1: Explore1Component,
  Explore2: Explore2Component,
  Favourites: FavouritesComponent,
  Settings: SettingsComponent,
};


export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activePage, setActivePage] = React.useState('Home'); // Default to Home

  // Get the active component from ComponentMap
  const ActiveComponent = ComponentMap[activePage] || (() => <Text>Page Not Found</Text>);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
        onSelect={setActivePage}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} onSelect={setActivePage} />
        </DrawerContent>
      </Drawer>
      {/* Mobile nav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <ActiveComponent /> {/* Render the selected component */}
      </Box>
    </Box>
  );
}


const SidebarContent = ({ onClose, onSelect, ...rest }) => {
  const [expandedMenu, setExpandedMenu] = React.useState(null); // Track expanded submenu

  const toggleSubmenu = (menuName) => {
    setExpandedMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Box key={link.key}>
          {/* Top-level menu item */}
          <NavItem
            icon={link.icon}
            isExpandable={link.children?.length > 0}
            isExpanded={expandedMenu === link.key}
            onClick={() => {
              if (link.children?.length > 0) {
                toggleSubmenu(link.key); // Expand/collapse submenu
              } else {
                onSelect(link.key); // Set activePage for non-expandable items
                if (onClose) onClose(); // Close sidebar on mobile
              }
            }}
          >
            {link.name}
          </NavItem>

          {/* Render submenus if they exist */}
          {expandedMenu === link.key &&
            link.children &&
            link.children.map((child) => (
              <NavItem
                key={child.key}
                pl="8" // Indent submenus
                onClick={() => {
                  onSelect(child.key); // Set activePage to submenu key
                  if (onClose) onClose(); // Close sidebar on mobile
                }}
              >
                {child.name}
              </NavItem>
            ))}
        </Box>
      ))}
    </Box>
  );
};





import { ChevronDownIcon } from '@chakra-ui/icons';

const NavItem = ({
  icon,
  children,
  isExpandable = false,
  isExpanded = false,
  pl = 4,
  ...rest
}) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        pl={pl} // Apply indentation
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        <Text flex="1">{children}</Text>
        {/* Add Chevron for expandable menus */}
        {isExpandable && (
          <ChevronDownIcon
            transform={isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="transform 0.2s"
          />
        )}
      </Flex>
    </Box>
  );
};



const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
