import React from "react";
import { Box } from "@chakra-ui/react";
import { FiHome, FiFileText, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi";

import HomeComponent from "./HomeComponent"
import KPIComponent from "./KPIComponent"
import ValuesComponent from "./ValuesComponent"
import StandardsComponent from "./StandardsComponent"
import TestingComponent from "./TestingComponent"
import MonitoringComponent from "./MonitoringComponent"
import MitigationComponent from "./MitigationComponent"
import DirectComponent from "./DirectComponent"
import ExternalityComponent from "./ExternalityComponent"
import CapabilityComponent from "./CapabilityComponent"

// Map of active pages to their components
const ComponentMap = {
  SectionOne: () => <Box>1</Box>,
    Home: HomeComponent,
    Values: ValuesComponent,
    KPIs: KPIComponent,
    Standards: StandardsComponent,
    
  SectionTwo: () => <Box>Design</Box>,
    Transparency: () => <Box>Transparency:  users when dealing with AI synthetic content, biometrics, etc. (Accountability.12)</Box>,
    Uncertainty: () => <Box>Uncertainty</Box>,
    Bias: () => <Box>Bias</Box>,
    Synergistic: () => <Box>Synergistic Design https://consilienceproject.org/development-in-progress/ </Box>,
    Privacy: () => <Box>Privacy</Box>,
    OTHER: () => <Box>other actionable responsible design things here that they can check if they've done...tbd on specifics. Will increase over time.</Box>,

  SectionThree: () => <Box>Assessing Impacts</Box>,
    FirstOrderImpacts: DirectComponent,
    NthOrderImpacts: ExternalityComponent,
    NthOrderSpecifics: CapabilityComponent,

  SectionFour: () => <Box>Measuring Impacts</Box>,
    TestingStrategy: TestingComponent,
    MonitoringStrategy: MonitoringComponent,
    MitigationStrategy: MitigationComponent,


  SectionFive: () => <Box>Successful Structure</Box>,
    HumanInLoop: () => <Box>HIL oversight</Box>,
    Policies: () => <Box>For data and governance</Box>,
    Roles: () => <Box>WHO is specifically responsible for risk management?</Box>,
};

// Navigation links
export const LinkItems = [
  { name: "Identify Goals", icon: FiFileText, key: "SectionOne", children: [
    
      { name: "Home", key: "Home"},
      { name: "Values", key: "Values" },
      { name: "KPIs", key: "KPIs" },
      { name: "Standards", key: "Standards" },
  ]},
  { name: "Utilize Design", icon: FiTrendingUp, key: "SectionTwo", children: [
    { name: "Transparency", key: "Transparency" },
    { name: "Uncertainty", key: "Uncertainty" },
    { name: "Bias", key: "Bias" },
    { name: "Synergistic", key: "Synergistic" },
    { name: "Other", key: "OTHER" },
  ]},
  { name: "Assess Impacts", icon: FiCompass, key: "SectionThree", children: [
    { name: "1st Order", key: "FirstOrderImpacts" },
    { name: "Nth Order", key: "NthOrderImpacts" },
    { name: "Deep Dive", key: "NthOrderSpecifics" },
  ]},
  { name: "Measure Impacts", icon: FiStar, key: "SectionFour", children: [
    { name: "Testing Strategy", key: "TestingStrategy" },
    { name: "Monitoring Strategy", key: "MonitoringStrategy" },
    { name: "Mitigation Strategy", key: "MitigationStrategy" },
  ]},
  { name: "Define Policies", icon: FiSettings, key: "SectionFive", children: [
    { name: "Human-In-The-Loop", key: "HumanInLoop" },
    { name: "Governance Policies", key: "Policies" },
    { name: "Roles", key: "Roles" },
  ]},

];

// Content component to render the active page
function Content({ activePage }) {
  // Get the active component from ComponentMap
  const ActiveComponent = ComponentMap[activePage];

  // If the component exists, render it, otherwise show "Page Not Found"
  return ActiveComponent ? <ActiveComponent /> : <Box>Page Not Found</Box>;
}

export default Content;
