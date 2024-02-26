import React, { createContext, useState } from 'react';
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
  Dropdown,
  Button,
} from '@carbon/react';
import { usePreAppointments, usePreAppointmentsFilter, weeksInYear } from './pre-appointment.resource';
import { useTranslation } from 'react-i18next';
import { ErrorState, usePagination } from '@openmrs/esm-framework';
import { usePaginationInfo } from '@openmrs/esm-patient-common-lib';
import styles from './pre-appointment.scss';

// Define the type of each row in the table
interface TableRow {
  id: string;
  ccc_number: string;
  person_name: string;
  age: number;
  uuid: string;
}

type PreAppointmentProps = {};

const PAGE_SIZE = 10;

export const PreAppointment: React.FC<PreAppointmentProps> = () => {
  const [locationUuid, setLocationUuid] = useState('');
  const [yearWeek, setYearWeek] = useState('');
  const [outcomeSuccess, setOutcomeSuccess] = useState(1);
  const PatientAppointmentContext = createContext(null);
  const { t } = useTranslation();
  const { preappointments, isLoading, error } = usePreAppointments(locationUuid, yearWeek);
  const weeksInYearData = weeksInYear(); // Renamed to avoid naming conflict

  // Define the headers for the table
  const headers = [
    { key: 'ccc_number', header: 'CCC Number' },
    { key: 'person_name', header: 'Person Name' },
    { key: 'age', header: 'Age' },
  ];

  // Pagination logic
  const { results, goTo, currentPage } = usePagination(preappointments ?? [], PAGE_SIZE);
  const { pageSizes } = usePaginationInfo(PAGE_SIZE, preappointments.length, currentPage, results.length);

  // Map data for table rows
  const tableRows: TableRow[] = results.map((row: any) => ({
    id: `${row.person_id}`,
    ccc_number: row.ccc_number,
    person_name: row.person_name ?? '--',
    age: row.age,
    uuid: row.uuid,
  }));

  // Function to handle generating the patient list
  const handleGenerateList = () => {
    const { preappointments, isLoading, error } = usePreAppointmentsFilter(locationUuid, yearWeek, outcomeSuccess);
    return { preappointments, isLoading, error };
  };

  if (isLoading) {
    return <DataTableSkeleton headers={headers} aria-label={t('preAppointments', 'Pre appointments')} />;
  }

  if (error) {
    return <ErrorState error={error} headerTitle={t('preAppointments', 'Pre appointments')} />;
  }

  return (
    <div className={styles.preAppointment}>
      <Dropdown
        items={weeksInYearData} // Updated to use the weeksInYearData variable
        itemToString={(item) => (item ? item.text : '')}
        titleText="Select Week"
        onChange={({ selectedItem }) => setYearWeek(selectedItem.id)}
        selectedItem={yearWeek}
      />
      <Dropdown
        items={[
          { id: 'option-0', text: 'All' },
          { id: 'option-1', text: 'Follow-up Successful' },
          { id: 'option-2', text: 'Failed Follow-up Attempt' },
          { id: 'option-3', text: 'Follow-up not Attempted' },
        ]}
        itemToString={(item: { text: any }) => (item ? item.text : '')}
        titleText="Appointment"
        onChange={({ selectedItem }) => setOutcomeSuccess(selectedItem.id)}
        selectedItem={outcomeSuccess}
      />
      <Button onClick={handleGenerateList}>Generate Patient List</Button>
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
        page={currentPage}
        pageSize={PAGE_SIZE}
        pageSizes={pageSizes}
        size="md"
        totalItems={103}
      />
    </div>
  );
};
