import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import Root from './root.component';
import { otzPatientChartMeta } from './dashboard.meta';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import OTZHomePatientTabs from './views/dashboard/patient-list-tabs/otz-patient-list-tabs.component';
import { createLeftPanelLink } from './left-panel-link.component';
import OTZSummaryTiles from './views/dashboard/summary-tiles/otz-summary-tiles.component';

export const moduleName = '@ampath/esm-otz-app';

const options = {
  featureName: 'esm-otz-app',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const root = getSyncLifecycle(Root, options);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const otzLeftPanelLink = getSyncLifecycle(
  createLeftPanelLink({
    name: 'otz',
    title: 'OTZ',
    slot: 'otz-dashboard-slot',
  }),
  options,
);
export const otzDashboardTiles = getSyncLifecycle(OTZSummaryTiles, {
  featureName: 'otz-home-tiles',
  moduleName,
});

export const otzDashboardTabs = getSyncLifecycle(OTZHomePatientTabs, {
  featureName: 'otz-home-tabs',
  moduleName,
});
