import useSWR from 'swr';
import { type PreAppointmentsConfig } from '../config-schema';
import { useConfig } from '@openmrs/esm-framework';

// Should use openmrsFetch to fetch data from the backend
// import { openmrsFetch } from '@openmrs/esm-api';

// Add the basic auth base64 string for the API call
const fetcher = (url, basicAuthBase64) =>
  fetch(url, { headers: { Authorization: basicAuthBase64 } }).then((r) => r.json());

export const usePreAppointments = (locationUuid: string, yearWeek: string) => {
  const { basicAuthBase64 } = useConfig<PreAppointmentsConfig>();

  const url = `https://ngx.ampath.or.ke/etl-latest/etl/ml-weekly-predictions?locationUuids=${locationUuid}&yearWeek=${yearWeek}`;
  const { data, isLoading, error, isValidating } = useSWR<PreAppointment>(url, () => fetcher(url, basicAuthBase64));
  return { preappoinments: data?.result ?? [], isLoading, error, isValidating };
};
