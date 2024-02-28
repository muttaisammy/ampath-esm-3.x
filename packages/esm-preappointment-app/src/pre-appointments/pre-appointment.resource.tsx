/* eslint-disable no-console */
import { type PreAppointmentsConfig } from '../config-schema';
import { useConfig } from '@openmrs/esm-framework';

// Should use openmrsFetch to fetch data from the backend
// import { openmrsFetch } from '@openmrs/esm-api';

// Add the basic auth base64 string for the API call
import useSWR from 'swr';
import { Buffer } from 'buffer';
const username = 'fkamau';
const password = 'Th1ng1r@1';
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

interface Location {
  id: any;
  text: string;
}

interface YearWeek {
  id: string;
  text: string;
}

interface AppointmentSuccess {
  id: any;
  text: string;
}

export const usePreAppointments = (locationUuid: string, yearWeek: string, successCode?: string) => {
  let url = `https://ngx.ampath.or.ke/etl-latest/etl/ml-weekly-predictions?locationUuids=${locationUuid}&yearWeek=${yearWeek}`;

  console.log('success: ', successCode);
  if (successCode && successCode !== '0') {
    url += successCode;
  }

  const { data, error, isValidating } = useSWR(url, fetcher);

  const result = data?.data?.result;

  return { preappointments: data?.result ?? [], isLoading: !data && !error, error, isValidating, url };
};

const getISOYear = (date) => {
  const year = date.getFullYear();
  const week1 = new Date(year, 0, 4); // January 4th is always in week 1
  return year + (date.getTime() < week1.getTime() ? -1 : 0);
};

const getISOWeek = (date) => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
};

const getStartOfWeek = (date) => {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  const startOfWeek = new Date(date.setDate(diff));
  return startOfWeek.toDateString();
};

const getEndOfWeek = (date) => {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  const endOfWeek = new Date(date.setDate(diff + 6));
  return endOfWeek.toDateString();
};
export const weeksInYear = () => {
  const today = new Date();
  const this_year = today.getFullYear();
  let startdate = new Date(this_year - 1, 0, 1); // January 1st of last year
  let enddate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Current date

  const weeks = [];

  while (startdate.getTime() <= enddate.getTime()) {
    const week = getISOWeek(startdate);
    const startofweek = getStartOfWeek(startdate);
    const endofweek = getEndOfWeek(startdate);

    weeks.push({
      id: `${getISOYear(startdate)}-W${('0' + week).slice(-2)}`,
      text: `${getISOYear(startdate)} W${('0' + week).slice(-2)}-From ${startofweek} to ${endofweek}`,
    });

    startdate.setDate(startdate.getDate() + 7); // Move to the next week
  }

  weeks.push({
    id: `${getISOYear(enddate)}-W${('0' + getISOWeek(enddate)).slice(-2)}`,
    text: `${getISOYear(enddate)} W${('0' + getISOWeek(enddate)).slice(-2)}-From ${getStartOfWeek(
      enddate,
    )} to ${getEndOfWeek(enddate)}`,
  });

  return weeks;
};
