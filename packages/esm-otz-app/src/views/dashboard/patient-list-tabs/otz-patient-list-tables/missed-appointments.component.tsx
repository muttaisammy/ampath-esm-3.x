import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Pagination,
  DataTableSkeleton,
  Button,
} from '@carbon/react';
import { Download } from '@carbon/react/icons';
import { ConfigurableLink, useConfig, usePagination } from '@openmrs/esm-framework';
import { EmptyState } from '../empty-state/empty-state.component';

const MissedAppointments: React.FC = () => {
  const { t } = useTranslation();
  //data fetching hook called here, will populate the table rows

  const headerData = [
    //will populate the data table headers
    {
      header: 'Patient Number',
      key: 'number',
    },
    {
      header: 'Name',
      key: 'name',
    },
    {
      header: 'Age',
      key: 'age',
    },
    {
      header: 'Sex',
      key: 'sex',
    },
    {
      header: 'Phone Number',
      key: 'phoneNumber',
    },
    {
      header: 'Last appointment date',
      key: 'lastAppointmentDate',
    },
    {
      header: 'Visit Type',
      key: 'visitType',
    },
    {
      header: 'Latest RTC Date',
      key: 'latestRTCDate',
    },
    {
      header: 'Days since last appointment',
      key: 'daysSinceLastAppointment',
    },
    {
      header: 'Current regimen',
      key: 'currentRegimen',
    },
    {
      header: 'Adherence',
      key: 'adherence',
    },
  ];

  return (
    <EmptyState
      displayText={t('missedAppointments-lower', 'missed appointments')}
      headerTitle={t('missedAppointments', 'Missed appointments')}
      scheduleType="Unscheduled"
    />
  );
};

export default MissedAppointments;
