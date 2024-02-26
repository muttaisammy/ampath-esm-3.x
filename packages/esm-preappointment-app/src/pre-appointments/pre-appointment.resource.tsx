import { type PreAppointmentsConfig } from '../config-schema';
import { useConfig } from '@openmrs/esm-framework';
const moment = require('moment');

// Should use openmrsFetch to fetch data from the backend
// import { openmrsFetch } from '@openmrs/esm-api';

// Add the basic auth base64 string for the API call
import useSWR from 'swr';
import { Buffer } from 'buffer';
const username = 'fkamau';
const password = 'Th1ng1r@1';
const basicAuthBase64 = Buffer.from(`${username}:${password}`).toString('base64');
const this_year = moment().year();
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

export const usePreAppointmentsFilter = (locationUuid: string, yearWeek: string, outcomeSuccess: number) => {
  const url = `https://ngx.ampath.or.ke/etl-latest-beta/etl/ml-weekly-predictions?locationUuids=${locationUuid}&yearWeek=${yearWeek}&successfulOutcome=${outcomeSuccess}`;

  const { data, error, isValidating } = useSWR(url, fetcher);
  return { preappointments: data?.result ?? [], isLoading: !data && !error, error, isValidating };
};

export const weeksInYear = () => {
  let startdate = new Date(`${this_year - 1}-1-1`);
  let enddate = moment(new Date()).format('YYYY-MM-DD');
  const weeks = [];
  while (new Date(startdate).getTime() <= new Date(enddate).getTime()) {
    const week = moment(startdate).format('W');
    let startofweek = moment(startdate).startOf('isoWeek').format('ll');
    let endofweek = moment(startdate).endOf('isoWeek').format('ll');

    weeks.push({
      id: `${moment(startdate).startOf('isoWeek').year()}-W${('0' + week).slice(-2)}`,
      text: `${moment(startdate).startOf('isoWeek').year()} W${('0' + week).slice(
        -2,
      )}-From ${startofweek} to ${endofweek}`,
    });
    startdate = moment(startdate).add(7, 'days').format('YYYY-MM-DD');
  }
  weeks.push({
    value: `${moment(enddate).startOf('isoWeek').year()}-W${('0' + moment(enddate).format('W')).slice(-2)}`,
    label: `${moment(enddate).startOf('isoWeek').year()} W${('0' + moment(enddate).format('W')).slice(
      -2,
    )}-From ${moment(enddate).startOf('isoWeek').format('ll')} to ${moment(enddate).endOf('isoWeek').format('ll')}`,
  });

  return weeks;
};
