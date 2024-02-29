import useSWR from 'swr';
import { openmrsFetch } from '@openmrs/esm-framework';
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
export const useIptReportByLocation = (locationUuid: string, endDate: string) => {
  const url = `https://ngx.ampath.or.ke/etl-latest/etl/tb-preventive-monthly-summary?locationUuids=${locationUuid}&endDate=${endDate}`;

  const { data, error, isValidating } = useSWR(url, () => fetcher(url));

  return {
    reportData: data ?? {},
    isLoading: !data && !error,
    error,
    isValidating,
  };
};
