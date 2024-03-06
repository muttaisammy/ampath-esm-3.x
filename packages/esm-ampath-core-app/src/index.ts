import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import ClinicalViewSection from './clinical-view-section.component';

const moduleName = '@ampath/esm-ampath-core-app';

const options = {
  featureName: 'esm-ampath-core-app',
  moduleName,
};
export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const dashboard = getAsyncLifecycle(() => import('./root'), options);

export const ampathNavItems = getAsyncLifecycle(
  () => import('./ampath-dashboard/side-menu/ampath-dashboard-side-nav.component'),
  {
    featureName: 'nav-items',
    moduleName,
  },
);

export const clinicalViewPatientDashboard = getSyncLifecycle(ClinicalViewSection, options);
