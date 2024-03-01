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
