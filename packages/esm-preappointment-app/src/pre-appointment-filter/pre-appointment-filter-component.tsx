import { DropdownSkeleton } from '@carbon/react';
import React from 'react';
import { usePreAppointments } from './pre-appointment-filter-resource';
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
// Should be provided by report filter controls
const testProps = {
  locationUuid: '08feae7c-1352-11df-a1f1-0026b9348838',
  yearWeek: '2024-W07',
  outcomeSuccess: 1,
};
export const PreAppointment: React.FC<PreAppointmentProps> = () => {
  const { t } = useTranslation();
  const { preappointments, isLoading, error } = usePreAppointments(
    testProps.locationUuid,
    testProps.yearWeek,
    testProps.outcomeSuccess,
  );
  // TODO: Append the rest of table headers for the pre-appointments
  const headers = [
    { key: 'ccc_number', header: 'CCC Number' },
    { key: 'person_name', header: 'Person Name' },
    { key: 'age', header: 'Age' },
  ];
  const { results, goTo, currentPage } = usePagination(preappointments ?? [], PAGE_SIZE);
  const { pageSizes } = usePaginationInfo(PAGE_SIZE, preappointments.length, currentPage, results.length);
  const tableRows: TableRow[] = results.map((row: any) => ({
    id: `${row.person_id}`,
    ccc_number: row.ccc_number,
    person_name: row.person_name ?? '--',
    age: row.age,
    uuid: row.uuid,
  }));
  if (isLoading) {
    return <DropdownSkeleton headers={headers} aria-label={t('preAppointments', 'Pre appointments')} />;
  }
  if (error) {
    return <ErrorState error={error} headerTitle={t('preAppointments', 'Pre appointments')} />;
  }
  return <div className={styles.preAppointment}></div>;
};
