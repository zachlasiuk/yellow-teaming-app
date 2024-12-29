import React from "react";
import { Box } from "@chakra-ui/react";
import { FiHome, FiFileText, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi";

import HomeComponent from "./HomeComponent"
import KPIComponent from "./KPIComponent"

// Map of active pages to their components
const ComponentMap = {
  SectionOne: () => <Box>1</Box>,
    Home:HomeComponent,
    Values: () => <Box>Values</Box>,
    Goals: () => <Box>Product Goals</Box>,
    KPIs: KPIComponent,
    Standards: () => <Box>Techncial & Legal standards to uphold.  (checkbox for options: AI-specific laws, data-specific like GDPR, sector-specific like HIPAA, or general laws like anti-discrimination)</Box>,
    
  SectionTwo: () => <Box>Design</Box>,
    Transparency: () => <Box>Transparency:  users when dealing with AI synthetic content, biometrics, etc. (Accountability.12)</Box>,
    Uncertainty: () => <Box>Uncertainty</Box>,
    Bias: () => <Box>Bias</Box>,
    Privacy: () => <Box>Privacy</Box>,
    OTHER: () => <Box>other actionable responsible design things here that they can check if they've done...tbd on specifics. Will increase over time.</Box>,

  SectionThree: () => <Box>Assessing Impacts</Box>,
    FirstOrderImpacts: () => <Box>FirstOrderImpacts</Box>,
    NthOrderImpacts: () => <Box>NthOrderImpacts, externality analysis</Box>,
    NthOrderSpecifics: () => <Box>Human capabilities, thriving, vulnerability impact analysis.</Box>,

  SectionFour: () => <Box>Measuring Impacts</Box>,
    TestingStrategy: () => <Box>Pre deployment testing strategy. Along with methods/tools used (Measuring.6)</Box>,
    MonitoringStrategy: () => <Box>(Measure.5 & Measure.6, Mitigation.7 requirement) - Include Error & Incident track/reporting (Mitigtaion.8) - Include documentation requirements (Accountability.11 - documentation)</Box>,
    MitigationStrategy: () => <Box>Migitagion.9</Box>,


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
      { name: "Goals", key: "Goals" },
      { name: "KPIs", key: "KPIs" },
      { name: "Standards", key: "Standards" },
  ]},
  { name: "Utilize Design", icon: FiTrendingUp, key: "SectionTwo", children: [
    { name: "Transparency", key: "Transparency" },
    { name: "Uncertainty", key: "Uncertainty" },
    { name: "Bias", key: "Bias" },
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
