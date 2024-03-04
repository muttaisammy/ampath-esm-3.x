import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import Root from './root.component';

const moduleName = '@ampath/esm-lab-order-manifest-app';

const options = {
  featureName: 'esm-lab-order-manifest-app',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const root = getSyncLifecycle(Root, options);
export const manifestOrdersComponent = getAsyncLifecycle(
  () => import('./lab-order-manifest/manifest-orders.component'),
  options,
);

export const postOrderToEidDialog = getAsyncLifecycle(
  () => import('./lab-order-manifest/dialog/post-to-eid-dialog.component'),
  options,
);

export const postOrderToEidButton = getAsyncLifecycle(
  () => import('./lab-order-manifest/order-actions/post-to-eid-action.component'),
  options,
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
