import { type PreAppointmentsConfig } from '../config-schema';
import { useConfig } from '@openmrs/esm-framework';

// Should use openmrsFetch to fetch data from the backend
// import { openmrsFetch } from '@openmrs/esm-api';

// Add the basic auth base64 string for the API call
import useSWR from 'swr';
import { Buffer } from 'buffer';
const username = '';
const password = '';
const basicAuthBase64 = Buffer.from(`${username}:${password}`).toString('base64');
const fetcher = async (url) => {
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Basic ${basicAuthBase64}` },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`An error occurred while fetching data: ${error.message}`);
  }
};
export const usePreAppointments = (locationUuid: string, yearWeek: string) => {
  const url = `https://ngx.ampath.or.ke/etl-latest/etl/ml-weekly-predictions?locationUuids=${locationUuid}&yearWeek=${yearWeek}`;
  const { data, error, isValidating } = useSWR(url, fetcher);
  return { preappointments: data?.result ?? [], isLoading: !data && !error, error, isValidating };
};
