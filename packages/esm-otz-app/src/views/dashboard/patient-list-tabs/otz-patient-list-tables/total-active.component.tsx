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

const TotalActive: React.FC = () => {
  const { t } = useTranslation();
  //data fetching hook called here, will populate the table rows

  const headerData = [
    {
      header: 'Patient Name',
      key: 'name',
    },
    {
      header: 'Identifier',
      key: 'identifier',
    },
    {
      header: 'Gender',
      key: 'gender',
    },
    {
      header: 'Phone Number',
      key: 'phoneNumber',
    },
  ];

  return (
    <EmptyState
      displayText={t('totalActiveDisplayText', 'total active patients')}
      headerTitle={t('totalActiveHeader', 'Total active patients')}
      scheduleType="Unscheduled"
    />
  );
};

export default TotalActive;
