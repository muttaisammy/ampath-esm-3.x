import useSWR from 'swr';

// Should use openmrsFetch to fetch data from the backend
// import { openmrsFetch } from '@openmrs/esm-api';

// Add the basic auth base64 string for the API call
const basicAuthBase64 = 'Basic';
const fetcher = (url) => fetch(url, { headers: { Authorization: basicAuthBase64 } }).then((r) => r.json());

export const usePreAppointments = (locationUuid: string, yearWeek: string) => {
  const url = `https://ngx.ampath.or.ke/etl-latest/etl/ml-weekly-predictions?locationUuids=${locationUuid}&yearWeek=${yearWeek}`;
  const { data, isLoading, error, isValidating } = useSWR<PreAppointment>(url, fetcher);
  return { preappoinments: data?.result ?? [], isLoading, error, isValidating };
};
