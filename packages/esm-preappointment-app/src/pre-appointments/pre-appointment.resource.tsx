import useSWR from 'swr';
import { Buffer } from 'buffer';

const username = 'fkamau';
const password = 'Th1ng1r@1';
const basicAuthBase64 = Buffer.from(`${username}:${password}`).toString('base64');

interface YearWeek {
  id: string;
  text: string;
}

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

export const usePreAppointments = (locationUuid: string, yearWeek: any, successCode?: any) => {
  let url = `https://ngx.ampath.or.ke/etl-latest/etl/ml-weekly-predictions?locationUuids=${locationUuid}&yearWeek=${yearWeek?.id}`;

  // if (successCode) {
  //   url += successCode.id;
  // }

  const { data, error, isLoading, isValidating } = useSWR(locationUuid && yearWeek ? url : null, fetcher);

  const preAppointments = data ? (data as any)?.result : [];

  return {
    preAppointments: preAppointments,
    isLoading,
    isValidating,
    error,
  };
};

function getISOYear(date) {
  const year = date.getFullYear();
  const week1 = new Date(year, 0, 4); // January 4th is always in week 1
  return year + (date.getTime() < week1.getTime() ? -1 : 0);
}

function getISOWeek(date) {
  const januaryFirst = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date.getTime() - januaryFirst.getTime()) / 86400000 + januaryFirst.getDay() + 1) / 7);
}

function getStartOfWeek(date) {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  const startOfWeek = new Date(date.setDate(diff));
  return startOfWeek.toDateString();
}

function getEndOfWeek(date) {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  const endOfWeek = new Date(date.setDate(diff + 6));
  return endOfWeek.toDateString();
}

export function getWeeksInYear() {
  const today = new Date();
  const thisYear = today.getFullYear();
  const weeks: Array<YearWeek> = [];

  let startDate = new Date(thisYear - 1, 0, 1); // January 1st of last year
  let endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Current date

  while (startDate.getTime() <= endDate.getTime()) {
    const week = getISOWeek(startDate);
    const startOfWeek = getStartOfWeek(startDate);
    const endOfWeek = getEndOfWeek(startDate);

    weeks.push({
      id: `${getISOYear(startDate)}-W${('0' + week).slice(-2)}`,
      text: `${getISOYear(startDate)} W${('0' + week).slice(-2)} - From ${startOfWeek} to ${endOfWeek}`,
    });

    startDate.setDate(startDate.getDate() + 7); // Move to the next week
  }

  weeks.push({
    id: `${getISOYear(endDate)}-W${('0' + getISOWeek(endDate)).slice(-2)}`,
    text: `${getISOYear(endDate)} W${('0' + getISOWeek(endDate)).slice(-2)}-From ${getStartOfWeek(
      endDate,
    )} to ${getEndOfWeek(endDate)}`,
  });

  return weeks;
}

export function getCurrentWeek() {
  const today = new Date();

  const currentWeek = {
    id: `${getISOYear(today)}-W${('0' + getISOWeek(today)).slice(-2)}`,
    text: `${getISOYear(today)} W${('0' + getISOWeek(today)).slice(-2)} - From ${getStartOfWeek(
      today,
    )} to ${getEndOfWeek(today)}`,
  };

  return currentWeek;
}
