import useSWR from 'swr';
import { Buffer } from 'buffer';
const moment = require('moment');
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
  if (successCode.id !== '' && successCode) {
    url += successCode.id;
  }

  const { data, error, isLoading, isValidating } = useSWR(url, fetcher);

  const preAppointments = data ? (data as any)?.result : [];

  return {
    preAppointments: preAppointments,
    isLoading,
    isValidating,
    error,
  };
};

export const weeksCalculation = () => {
  const this_year = moment().year();
  let startdate = new Date(`${this_year - 1}-1-1`);
  let enddate = moment(new Date()).format('YYYY-MM-DD');
  const weeks = [];
  while (new Date(startdate).getTime() <= new Date(enddate).getTime()) {
    const week = moment(startdate).format('W');
    let startofweek = moment(startdate).startOf('isoWeek').format('ll');
    let endofweek = moment(startdate).endOf('isoWeek').format('ll');

    weeks.push({
      id: `${moment(startdate).startOf('isoWeek').year()}-W${('0' + week).slice(-2)}`,
      text: `${moment(startdate).startOf('isoWeek').year()} W${('0' + week).slice(-2)}-From ${startofweek} to ${endofweek}`,
    });
    startdate = moment(startdate).add(7, 'days').format('YYYY-MM-DD');
  }
  weeks.push({
    id: `${moment(enddate).startOf('isoWeek').year()}-W${('0' + moment(enddate).format('W')).slice(-2)}`,
    text: `${moment(enddate).startOf('isoWeek').year()} W${('0' + moment(enddate).format('W')).slice(-2)}-From ${moment(enddate).startOf('isoWeek').format('ll')} to ${moment(enddate).endOf('isoWeek').format('ll')}`,
  });

  return weeks.reverse();
};
