import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  DataTableSkeleton,
  Pagination,
} from '@carbon/react';
import React from 'react';
import { usePreAppointments } from './pre-appointment.resource';
import { useTranslation } from 'react-i18next';
import { ErrorState, useConfig, usePagination } from '@openmrs/esm-framework';
import { EmptyState, usePaginationInfo } from '@openmrs/esm-patient-common-lib';
import styles from './pre-appointment.scss';
import { PreAppointmentsConfig } from '../config-schema';

type PreAppointmentProps = {};
const PAGE_SIZE = 10;
// Should be provided by report filter controls
const testProps = {
  locationUuid: '08feae7c-1352-11df-a1f1-0026b9348838',
  yearWeek: '2024-W07',
};

export const PreAppointment: React.FC<PreAppointmentProps> = () => {
  const { t } = useTranslation();
  const { preappoinments, isLoading, error } = usePreAppointments(testProps.locationUuid, testProps.yearWeek);

  // TODO: Append the rest of table headers for the pre-appointments
  const headers = [
    { key: 'ccc_number', header: 'CCC Number' },
    { key: 'person_name', header: 'Person Name' },
    { key: 'age', header: 'Age' },
  ];

  const { results, goTo, currentPage = 0 } = usePagination(preappoinments, PAGE_SIZE);
  const { pageSizes = [] } = usePaginationInfo(PAGE_SIZE, preappoinments?.length, currentPage, results?.length ?? 0);

  const tableRows = results.map((row) => ({
    id: `${row.person_id}`,
    ccc_number: row.ccc_number,
    person_name: row.person_name ?? '--',
    age: row.age,
    uuid: row.uuid,
  }));

  if (isLoading) {
    return <DataTableSkeleton headers={headers} aria-label={t('preAppointments', 'Pre appointments')} />;
  }

  if (error) {
    return <ErrorState error={error} headerTitle={t('preAppointments', 'Pre appointments')} />;
  }

  if (!preappoinments?.length) {
    return (
      <div className={styles.emptyStateContainer}>
        <EmptyState
          headerTitle={t('preAppointments', 'Pre appointments')}
          displayText={t('preAppointments', 'Pre appointments')}
        />
      </div>
    );
  }

  return (
    <div className={styles.preAppointment}>
      <DataTable rows={tableRows} headers={headers} size="sm" useZebraStyles>
        {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getTableContainerProps }) => (
          <TableContainer
            title={t('preAppointments', 'Pre-Appointments')}
            description={t('preAppointmentDescription', 'Pre-appointments for the selected week')}
            {...getTableContainerProps()}>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({
                        header,
                      })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow
                      key={row.id}
                      {...getRowProps({
                        row,
                      })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>

      <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        onChange={({ page }) => goTo(page)}
        page={currentPage ?? 0}
        pageSize={PAGE_SIZE}
        pageSizes={pageSizes ?? []}
        size="md"
        totalItems={preappoinments?.length ?? 0}
      />
    </div>
  );
};
