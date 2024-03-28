import { Coronavirus } from '@carbon/react/icons';

export const otzPatientChartMeta = {
  title: 'OTZ',
  slotName: 'ampath-otz-patient-chart-slot',
  isExpanded: false,
};

export const otzDashboardMeta = {
  name: 'otz-cases',
  slot: 'otz-cases-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'otz', dashboardTitle: 'OTZ clubs', icon: Coronavirus },
  title: 'OTZ clubs',
  dashboardIcon: Coronavirus,
};

export const otzPatientClinicalChartMeta = {
  title: 'OTZ Program',
  slotName: 'ohri-otz-slot',
  isExpanded: false,
};

export const otzPatientSummaryMeta = {
  slot: 'otz-patient-summary-slot',
  columns: 1,
  title: 'OTZ Patient Summary',
  path: 'otz-patient-summary',
  layoutMode: 'anchored',
};

export const otzProgramManagementDashboardMeta = {
  slot: 'otz-program-management-summary-slot',
  columns: 1,
  title: 'OTZ Services',
  path: 'otz-program-management',
  layoutMode: 'anchored',
};
