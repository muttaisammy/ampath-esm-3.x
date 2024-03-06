import { Type } from '@openmrs/esm-framework';
export const configSchema = {
  basicAuthBase64: {
    _type: Type.String,
    _description: 'Basic auth base64 string for the API call e.g Basic someBase64String==',
    _default: '',
  },
};

export type PreAppointmentsConfig = {
  basicAuthBase64: string;
};
