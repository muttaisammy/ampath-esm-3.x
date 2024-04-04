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

const EligibleForVLTest: React.FC = () => {
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
      header: 'Latest VL',
      key: 'latestVL',
    },
    {
      header: 'Latest VL Date',
      key: 'latestVLDate',
    },
    {
      header: 'VL Category',
      key: 'vlCategory',
    },
    {
      header: 'Latest RTC date',
      key: 'latestRTCDate',
    },
  ];

  return (
    <EmptyState
      displayText={t('vlEligibilityDisplay', 'patients eligible for viral load testing')}
      headerTitle={t('vlEligibilityHeader', 'Eligible for Viral Load Testing')}
      scheduleType="Unscheduled"
    />
  );
};

export default EligibleForVLTest;
