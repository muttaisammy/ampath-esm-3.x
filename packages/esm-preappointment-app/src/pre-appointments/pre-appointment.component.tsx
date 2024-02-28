/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
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
import React, { useState, useEffect } from 'react';
import { usePreAppointments, weeksInYear } from './pre-appointment.resource';
import { useTranslation } from 'react-i18next';
import { ErrorState, useLocations, usePagination } from '@openmrs/esm-framework';
import { usePaginationInfo } from '@openmrs/esm-patient-common-lib';
import styles from './pre-appointment.scss';
import { Row } from '@carbon/react';
// import { useState,useEffect } from 'react';

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
type PreAppointmentProps = {};
const PAGE_SIZE = 10;
// Should be provided by report filter controls
const testProps = {
  locationUuid: { id: '08feb8ae-1352-11df-a1f1-0026b9348838', text: 'MTRH' },
  yearWeek: { id: '2024-W07', text: 'Current week we are in' },
  appointmentSuccess: { id: '0', text: 'All' },
};

export const PreAppointment: React.FC<PreAppointmentProps> = () => {
  // const locations = useLocations();
  const [locationUuid, setLocationUuid] = useState('08feb8ae-1352-11df-a1f1-0026b9348838');
  const [week, setWeek] = useState('2024-W07');
  const [statusFilter, setStatusFilter] = useState('0');
  // const [preappointmentsData, setPreappointmentsData] = useState([]);
  const [isLoadingStatus, setIsLoadingstatus] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  // const { preappointments, isLoading, error } = usePreAppointments(locationUuid, week, statusFilter);
  // const fetchData = () => {
  //   try {
  //     const { preappointments, isLoading, error, url } = usePreAppointments(locationUuid, week, statusFilter);
  //     if (preappointments) {
  //       setPreappointmentsData(preappointments);
  //       setIsLoadingstatus(false);
  //       setErrorStatus(error);
  //     }
  //   } catch (error) {
  //     console.log('>>>>>>>>>>>>>>>>>>', error);

  //     setIsLoadingstatus(false);
  //     setErrorStatus(error);
  //   }
  // };
  const { preappointments, isLoading, error } = usePreAppointments(locationUuid, week, statusFilter);

  // fetchData();
  // useEffect(() => {
  //   // console.log('****************');
  //   // const { preappointments, isLoading, error, url } =  usePreAppointments(locationUuid, week, statusFilter);
  //   // console.log(url);
  //   fetchData();
  //   console.log('hggyugyugyugyuf');
  // }, []);

  const handleSubmitFilters = () => {
    // console.log(locationUuid, week, statusFilter);
    // fetchData();
  };

  const { t } = useTranslation();
  const weeksData = weeksInYear();

  const headers = [
    { key: 'ccc_number', header: 'CCC Number' },
    { key: 'person_name', header: 'Person Name' },
    { key: 'upi_number', header: 'Nupi_number' },
    { key: 'gender', header: 'Gender' },
    { key: 'age', header: 'Age' },
    { key: 'identifiers', header: 'Identifiers' },
    { key: 'program', header: 'Program' },
    { key: 'phone_number', header: 'Phone Number' },
    { key: 'predicted_risk', header: 'Predicted Risk' },
    { key: 'predicted_prob_disengage', header: 'Predicted Score(%)' },
    { key: 'prediction_generated_date', header: 'Prediction Generated Date' },
    { key: 'last_appointment', header: 'latest Appointment' },
    { key: 'rtc_date', header: 'Rtc Date' },
    { key: 'latest_rtc_date', header: 'Latest Rtc Date' },
    { key: 'cur_meds', header: 'Current Regimen' },
    { key: 'latest_vl', header: 'Latest VL' },
    { key: 'latest_vl_date', header: 'Latest VL Date' },
    { key: 'vl_category', header: 'VL Category' },
    { key: 'follow_up_type', header: 'Follow-up Type' },
    { key: 'follow_up_reason', header: 'Follow-up Reason' },
    { key: 'was_follow_up_successful', header: 'Follow-up Success' },
    { key: 'rescheduled_date', header: 'Rescheduled Date' },
    { key: 'number_of_failed_phone_attempts', header: 'No. of Failed Phone Attempts' },
    { key: 'comments', header: 'comments' },
    { key: 'sms_delivery_status', header: 'SMS outcome' },
    { key: 'contact_reached', header: 'Contact Reached' },
    { key: 'attempted_home_visit', header: 'Attempted Home Visit' },
    { key: 'reason_not_attempted_home_visit', header: 'Reason Not Attempted Home Visit' },
    { key: 'was_client_found', header: 'Client Found' },
    { key: 'reason_client_not_found', header: 'Reason Client Not Found' },
    { key: 'nearest_center', header: 'Nearest Center' },
    { key: 'covid_19_vaccination_status', header: 'COVID-19 Vaccination Status' },
    { key: 'uuid', header: 'UUID' },
  ];

  // const { results, goTo, currentPage } = usePagination(preappointments ?? [], PAGE_SIZE);
  // const { pageSizes } = usePaginationInfo(PAGE_SIZE, preappointments.length, currentPage, results.length);

  const tableRows: TableRow[] = preappointments.map((row: any) => ({
    id: row.person_id,
    ccc_number: row.ccc_number,
    person_name: row.person_name ?? '--',
    age: row.age,
    uuid: row.uuid,
    patient_uuid: row.patient_uuid,
    ovcid_id: row.ovcid_id,
    upi_number: row.upi_number,
    program: row.program,
    predicted_risk: row.predicted_risk,
    predicted_prob_disengage: row.predicted_prob_disengage,
    prediction_generated_date: row.prediction_generated_date,
    sms_delivery_status: row.sms_delivery_status,
    rtc_date: row.rtc_date,
    follow_up_type: row.follow_up_type,
    follow_up_reason: row.follow_up_reason,
    rescheduled_date: row.rescheduled_date,
    contact_reached: row.contact_reached,
    attempted_home_visit: row.attempted_home_visit,
    reason_not_attempted_home_visit: row.reason_not_attempted_home_visit,
    was_client_found: row.was_client_found,
    comments: row.comments,
    reason_client_not_found: row.reason_client_not_found,
    was_follow_up_successful: row.was_follow_up_successful,
    number_of_failed_phone_attempts: row.number_of_failed_phone_attempts,
    gender: row.gender,
    identifiers: row.identifiers,
    phone_number: row.phone_number,
    latest_rtc_date: row.latest_rtc_date,
    latest_vl: row.latest_vl,
    vl_category: row.vl_category,
    latest_vl_date: row.latest_vl_date,
    last_appointment: row.last_appointment,
    cur_meds: row.cur_meds,
    nearest_center: row.nearest_center,
    covid_19_vaccination_status: row.covid_19_vaccination_status,
  }));

  // if (isLoadingStatus) {
  //   return <DataTableSkeleton headers={headers} aria-label={t('preAppointments', 'Pre appointments')} />;
  // }
  // if (errorStatus) {
  //   return <ErrorState error={errorStatus} headerTitle={t('preAppointments', 'Pre appointments')} />;
  // }
  return (
    <div className={styles.preAppointment}>
      <Dropdown
        items={[
          { id: '08feb8ae-1352-11df-a1f1-0026b9348838', text: 'MTRH' },
          { id: '08feb8ae-1352-11df-a1f1-0026b9348838', text: 'Test Site ' },
          { id: '08feb8ae-1352-11df-a1f1-0026b9348838', text: 'Webuye' },
        ]}
        itemToElement={(item) => (item ? <span className="test">{item.text}</span> : '')}
        label="Select Location"
        titleText="Select Location"
        onChange={({ selectedItem }) => setLocationUuid(selectedItem)}
        selectedItem={locationUuid}
      />
      <Dropdown
        items={weeksData}
        itemToElement={(item) => (item ? <span className="test">{item.text}</span> : '')}
        label="Select Week"
        titleText="Year Week"
        onChange={({ selectedItem }) => setWeek(selectedItem)}
        selectedItem={week}
      />

      <Dropdown
        items={[
          { id: '0', text: 'All' },
          { id: '&successfulOutcome=1', text: 'Follow-up Successful' },
          { id: '&failedOutcome=1', text: 'Failed Follow-up Attempt' },
          { id: '&unknownOutcome=0', text: 'Follow-up Not Attempted' },
        ]}
        itemToElement={(item) => (item ? <span className="test">{item.text}</span> : '')}
        label="Filter"
        titleText="Filter Type"
        onChange={({ selectedItem }) => {
          console.log('selectedItem from dropdown: ', selectedItem.id);
          setStatusFilter(selectedItem.id);
        }}
        selectedItem={statusFilter}
      />

      <Button onClick={handleSubmitFilters}>Generate Patient List</Button>

      <DataTable rows={tableRows} headers={headers} size="sm">
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps, getTableContainerProps }) => (
          <TableContainer
            title={t('preAppointments', 'Pre-Appointments')}
            description={t('preAppointmentDescription', 'Pre-appointments for the selected week')}
            {...getTableContainerProps()}>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) =>
                  row.cells.find((cell) => cell.info.header === 'was_follow_up_successful').value == 0 &&
                  row.cells.find((cell) => cell.info.header === 'follow_up_type').value != null ? (
                    styles.partial_followup
                  ) : (
                    <TableRow
                      {...getRowProps({ row })}
                      onClick={() => {
                        const patientId = row.cells.find((cell) => cell.info.header === 'uuid')?.value;
                        const url = `http://localhost:5500/amrs/spa/patient/${patientId}/chart/Patient%20Summary`;
                        window.location.href = url;
                      }}>
                      {row.cells.map((cell) => (
                        <>
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                          {(() => {
                            // console.log(locationUuid);
                            // console.log(statusFilter);
                            // console.log(week);
                            return null;
                          })()}
                        </>
                      ))}
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
      {/*       
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
      /> */}
    </div>
  );
};
