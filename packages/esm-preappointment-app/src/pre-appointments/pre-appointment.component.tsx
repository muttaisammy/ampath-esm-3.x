import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DataTable,
  DataTableSkeleton,
  Row,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tile,
  Dropdown,
  Button,
  Column,
  Grid,
} from '@carbon/react';
import {
  ConfigurableLink,
  isDesktop,
  useLayoutType,
  useLocations,
  usePagination,
  useSession,
} from '@openmrs/esm-framework';
import { ErrorState, usePaginationInfo } from '@openmrs/esm-patient-common-lib';
import { CustomPagination } from '../custom-pagination.component';
import { usePreAppointments, weeksCalculation } from './pre-appointment.resource';
import styles from './pre-appointment.scss';

// Define the type of each row in the table
interface TableRow {
  id: string;
  ccc_number: string;
  person_name: string;
  ovcid_id: string;
  upi_number: string;
  program: string;
  predicted_risk: string;
  predicted_prob_disengage: string;
  prediction_generated_date: string;
  sms_delivery_status: string;
  rtc_date: string;
  follow_up_type: string;
  follow_up_reason: string;
  rescheduled_date: string;
  contact_reached: string;
  attempted_home_visit: string;
  reason_not_attempted_home_visit: string;
  was_client_found: string;
  comments: string;
  reason_client_not_found: string;
  was_follow_up_successful: boolean;
  number_of_failed_phone_attempts: string;
  gender: string;
  identifiers: string;
  phone_number: string;
  latest_rtc_date: string;
  latest_vl: number;
  vl_category: string;
  latest_vl_date: string;
  last_appointment: string;
  cur_meds: string;
  nearest_center: string;
  covid_19_vaccination_status: string;
  age: number;
  uuid: string;
}

type Values<T> = T[keyof T];
type PreAppointmentProps = {};

const Status = {
  ALL: '',
  SUCCESSFULL_FOLLOW_UP: '&successfulOutcome=1',
  FAILED_OUTCOME: '&failedOutcome=1',
  UNKNOWN_OUTCOME: '&unknownOutcome=1',
} as const;

const PAGE_SIZE = 10;

export const PreAppointment: React.FC<PreAppointmentProps> = () => {
  const { t } = useTranslation();
  const session = useSession();
  const layout = useLayoutType();
  const responsiveSize = isDesktop ? 'sm' : 'lg';

  const statuses: Array<{ value: string; text: string; id: Values<typeof Status> }> = [
    { value: 'all', text: 'All', id: Status.ALL },
    { value: 'successful-followup', text: 'Successful followup', id: Status.SUCCESSFULL_FOLLOW_UP },
    { value: 'failed-followup', text: 'Failed followup attempt', id: Status.FAILED_OUTCOME },
    { value: 'followup-not-attempted', text: 'Followup not attempted', id: Status.UNKNOWN_OUTCOME },
  ];

  const weeks = weeksCalculation();
  const pageSize = 5;
  const locations = useLocations('Login Location');
  const initialLocation = locations?.find((location) => location.uuid === loggedInLocation)?.display;
  const loggedInLocation = session?.sessionLocation?.uuid ?? '';
  const [locationUuid, setLocationUuid] = useState(loggedInLocation);
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);
  const [status, setStatus] = useState(Status.ALL);

  const { preAppointments, isLoading, error } = usePreAppointments(locationUuid, selectedWeek, status);
  const { paginated, goTo, results, currentPage } = usePagination(preAppointments, pageSize);
  const { pageSizes } = usePaginationInfo(PAGE_SIZE, preAppointments.length, currentPage, results.length);

  const headers = [
    { key: 'ccc_number', header: 'CCC number' },
    { key: 'person_name', header: 'Person name' },
    { key: 'upi_number', header: 'NUPI number' },
    { key: 'gender', header: 'Gender' },
    { key: 'age', header: 'Age' },
    { key: 'identifiers', header: 'Identifiers' },
    { key: 'program', header: 'Program' },
    { key: 'phone_number', header: 'Phone number' },
    { key: 'predicted_risk', header: 'Predicted risk' },
    { key: 'predicted_prob_disengage', header: 'Predicted Score (%)' },
    { key: 'prediction_generated_date', header: 'Prediction generation date' },
    { key: 'last_appointment', header: 'Latest appointment' },
    { key: 'rtc_date', header: 'RTC date' },
    { key: 'latest_rtc_date', header: 'Latest RTC date' },
    { key: 'cur_meds', header: 'Current regimen' },
    { key: 'latest_vl', header: 'Latest VL' },
    { key: 'latest_vl_date', header: 'Latest VL date' },
    { key: 'vl_category', header: 'VL category' },
    { key: 'follow_up_type', header: 'Follow-up type' },
    { key: 'follow_up_reason', header: 'Follow-up reason' },
    { key: 'was_follow_up_successful', header: 'Follow-up success' },
    { key: 'rescheduled_date', header: 'Rescheduled date' },
    { key: 'number_of_failed_phone_attempts', header: 'No. of failed phone attempts' },
    { key: 'comments', header: 'Comments' },
    { key: 'sms_delivery_status', header: 'SMS outcome' },
    { key: 'contact_reached', header: 'Contact reached' },
    { key: 'attempted_home_visit', header: 'Attempted home visit' },
    { key: 'reason_not_attempted_home_visit', header: 'Reason home visit was not attempted' },
    { key: 'was_client_found', header: 'Client found' },
    { key: 'reason_client_not_found', header: 'Reason client not found' },
    { key: 'nearest_center', header: 'Nearest center' },
    { key: 'covid_19_vaccination_status', header: 'COVID-19 vaccination status' },
  ];

  const tableRows = useMemo(() => {
    return results.map((row: any) => ({
      ...row,
      id: row.person_id,
      person_name: row.person_name ?? '--',
    }));
  }, [results]);

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={5}
        compact={isDesktop(layout)}
        role="progressbar"
        rowCount={pageSize}
        showHeader={false}
        showToolbar={false}
        zebra
      />
    );
  }

  if (error) {
    return <ErrorState error={error} headerTitle={t('preAppointments', 'Pre-Appointments')} />;
  }

  return (
    <div className={styles.preAppointment}>
      <div className={styles.headerContainer}>
        <div className={isDesktop(layout) ? styles.desktopHeading : styles.tabletHeading}>
          <h4>{t('preAppointments', 'Pre-appointments')}</h4>
        </div>
      </div>
      <br />
      <Grid className={styles.gridRow}>
        <Column lg={16}>
          <Dropdown
            items={locations}
            itemToString={(item) => item.display}
            label="Select Location"
            titleText="Select Location"
            initialSelectedItem={locationUuid}
            onChange={({ selectedItem }) => setLocationUuid(selectedItem)}
            selectedItem={locationUuid}
          />
        </Column>
      </Grid>
      <Grid className={styles.gridRow}>
        <Column lg={5}>
          <Dropdown
            items={weeks}
            itemToElement={(item) => (item ? <span className="test">{item.text}</span> : '')}
            itemToString={(item) => item.text}
            label="Select Week"
            titleText="Year Week"
            initialSelectedItem={selectedWeek}
            onChange={({ selectedItem }) => setSelectedWeek(selectedItem)}
            selectedItem={selectedWeek}
          />
        </Column>
        <Column lg={5}>
          <Dropdown
            aria-label="Filter by status"
            className={styles.statusFilter}
            initialSelectedItem={statuses[0]}
            items={statuses}
            itemToString={(item) => (item ? item.text : '')}
            label="Select a status"
            onChange={({ selectedItem }) => setStatus(selectedItem)}
            selectedItem={status}
            titleText="Filter by status:"
            // type="inline"
          />
        </Column>
        <Column lg={5}>
          {/* <Button onClick={handleSubmitFilters} className={styles.filterButton} size='md'>Generate Patient List</Button> */}
        </Column>
      </Grid>

      <br />
      <DataTable rows={tableRows} headers={headers} size={responsiveSize}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps, getTableContainerProps }) => (
          <>
            <TableContainer className={styles.tableContainer} {...getTableContainerProps()}>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => {
                    const patientChartUrl = '${openmrsSpaBase}/patient/${patientUuid}/chart/Patient%20Summary';
                    const currentAppointment = tableRows.find((p) => p.id === row.id);

                    if (!currentAppointment) {
                      return null;
                    }

                    return (
                      <React.Fragment key={index}>
                        <TableRow
                          {...getRowProps({ row })}
                          className={`
                            ${
                              row.cells.find((cell) => cell.info.header === 'was_follow_up_successful').value === 0 &&
                              row.cells.find((cell) => cell.info.header === 'follow_up_type').value !== null
                                ? styles.partial_followup
                                : row.cells.find((cell) => cell.info.header === 'was_follow_up_successful').value ===
                                      1 &&
                                    row.cells.find((cell) => cell.info.header === 'follow_up_type').value !== null
                                  ? styles.successfull_followup
                                  : row.cells.find((cell) => cell.info.header === 'was_follow_up_successful').value ==
                                        1 &&
                                      row.cells.find((cell) => cell.info.header === 'reschedule_appointment').value !=
                                        null
                                    ? styles.rescheduled_followup
                                    : null
                            }
                        `}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id} data-testid={cell.id}>
                              {cell.info.header === 'person_name' && currentAppointment.uuid ? (
                                <ConfigurableLink
                                  to={patientChartUrl}
                                  templateParams={{ patientUuid: currentAppointment.uuid }}>
                                  {cell.value}
                                </ConfigurableLink>
                              ) : (
                                cell.value
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {tableRows.length === 0 ? (
              <div className={styles.tileContainer}>
                <Tile className={styles.tile}>
                  <div className={styles.tileContent}>
                    <p className={styles.content}>
                      {t('noMatchingRecordsToDisplay', 'No matching records to display')}
                    </p>
                    <p className={styles.helper}>{t('checkFilters', 'Check the filters above')}</p>
                  </div>
                </Tile>
              </div>
            ) : null}
          </>
        )}
      </DataTable>
      {paginated && (
        <CustomPagination
          currentItems={results.length}
          totalItems={preAppointments.length}
          onPageNumberChange={({ page }) => goTo(page)}
          pageNumber={currentPage}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
