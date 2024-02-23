import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import Root from './root.component';
import { PreAppointment } from './pre-appointments/pre-appointment.component';

const moduleName = '@ampath/esm-preappointment-app';

const options = {
  featureName: 'esm-preappointment-app',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const root = getSyncLifecycle(Root, options);
export const preAppointments = getSyncLifecycle(PreAppointment, options);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
