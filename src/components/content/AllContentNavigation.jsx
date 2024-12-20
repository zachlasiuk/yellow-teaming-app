import React from "react";
import { Box } from "@chakra-ui/react";
import { FiHome, FiFileText, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi";

import HomeComponent from "./HomeComponent"

// Map of active pages to their components
const ComponentMap = {
  Home: HomeComponent,
  SolutionDetails: () => <Box>Solution Details</Box>,
  Trending1: () => <Box>Trending 1</Box>,
  Trending2: () => <Box>Trending 2</Box>,
  Explore1: () => <Box>Explore 1</Box>,
  Explore2: () => <Box>Explore 2</Box>,
  Favourites: () => <Box>Favourites</Box>,
  Settings: () => <Box>Settings</Box>,
};

// Navigation links
export const LinkItems = [
  { name: "Home", icon: FiHome, key: "Home", children: [] },
  { name: "Solution Details", icon: FiFileText, key: "SolutionDetails", children: [] },
  {
    name: "Trending",
    icon: FiTrendingUp,
    key: "Trending",
    children: [
      { name: "Trending 1", key: "Trending1" },
      { name: "Trending 2", key: "Trending2" },
    ],
  },
  { name: "Explore", icon: FiCompass, key: "Explore", children: [] },
  { name: "Favourites", icon: FiStar, key: "Favourites", children: [] },
  { name: "Settings", icon: FiSettings, key: "Settings", children: [] },
];

// Content component to render the active page
function Content({ activePage }) {
  // Get the active component from ComponentMap
  const ActiveComponent = ComponentMap[activePage];

  // If the component exists, render it, otherwise show "Page Not Found"
  return ActiveComponent ? <ActiveComponent /> : <Box>Page Not Found</Box>;
}

export default Content;
