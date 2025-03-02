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

import BiasComponent from "./BiasComponent"
import SynergisticComponent from "./SynergisticComponent"
import TransparencyComponent from "./TransparencyComponent"
import UncertaintyComponent from "./UncertaintyComponent"
import PrivacyComponent from "./PrivacyComponent"
import AgenticComponent from "./AgenticComponent"

import GovernanceComponent from "./GovernanceComponent"
import RolesComponent from "./RolesComponent"
import HumanintheloopComponent from "./HumanintheloopComponent"


// Map of active pages to their components
const ComponentMap = {
  SectionOne: () => <Box>1</Box>,
    Home: HomeComponent,
    Values: ValuesComponent,
    KPIs: KPIComponent,
    Standards: StandardsComponent,
    
  SectionTwo: () => <Box>Design</Box>,
    Transparency: TransparencyComponent,
    Uncertainty: UncertaintyComponent,
    Bias: BiasComponent,
    Synergistic: SynergisticComponent,
    Privacy: PrivacyComponent,
    Agentic: AgenticComponent,

  SectionThree: () => <Box>Assessing Impacts</Box>,
    FirstOrderImpacts: DirectComponent,
    NthOrderImpacts: ExternalityComponent,
    NthOrderSpecifics: CapabilityComponent,

  SectionFour: () => <Box>Measuring Impacts</Box>,
    TestingStrategy: TestingComponent,
    MonitoringStrategy: MonitoringComponent,
    MitigationStrategy: MitigationComponent,


  SectionFive: () => <Box>Successful Structure</Box>,
    HumanInLoop: HumanintheloopComponent,
    Policies: GovernanceComponent,
    Roles: RolesComponent,
};

// Navigation links
export const LinkItems = [
  { name: "Identify Goals", icon: FiFileText, key: "SectionOne", children: [
      { name: "Home", key: "Home"},
      { name: "1) Values", key: "Values" },
      { name: "2) KPIs", key: "KPIs" },
      { name: "3) Standards", key: "Standards" },
  ]},
  { name: "Utilize Design", icon: FiTrendingUp, key: "SectionTwo", children: [
    { name: "4) Transparency", key: "Transparency", },
    { name: "5) Uncertainty", key: "Uncertainty" },
    { name: "6) Bias", key: "Bias" },
    { name: "7) Synergistic", key: "Synergistic" },
    { name: "8) Privacy", key: "Privacy" },
    { name: "9) Agentic", key: "Agentic" }
  ]},
  { name: "Assess Impacts", icon: FiCompass, key: "SectionThree", children: [
    { name: "10) 1st Order", key: "FirstOrderImpacts" },
    { name: "11) Nth Order", key: "NthOrderImpacts" },
    { name: "12) Deep Dive", key: "NthOrderSpecifics" },
  ]},
  { name: "Measure Impacts", icon: FiStar, key: "SectionFour", children: [
    { name: "13) Testing Strategy", key: "TestingStrategy" },
    { name: "14) Monitoring Strategy", key: "MonitoringStrategy" },
    { name: "15) Mitigation Strategy", key: "MitigationStrategy" },
  ]},
  { name: "Define Policies", icon: FiSettings, key: "SectionFive", children: [
    { name: "16) Human-In-The-Loop", key: "HumanInLoop" },
    { name: "17) Governance Policies", key: "Policies" },
    { name: "18) Roles", key: "Roles" },
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
