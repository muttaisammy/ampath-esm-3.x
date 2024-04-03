import React from 'react';
import { EmptyState } from '@openmrs/esm-patient-common-lib';
import { useTranslation } from 'react-i18next';

const OtzPatientSummary: React.FC = () => {
  const { t } = useTranslation();

  const headerClinicalViews = t('clinicalViews', 'clinical Views');
  const headerAppointments = t('appointments', 'Appointments');
  const headerViralLoads = t('viralLoads', 'viral Loads');

  return (
    <>
      <EmptyState displayText={headerClinicalViews} headerTitle={headerClinicalViews} />

      <EmptyState displayText={headerAppointments} headerTitle={headerAppointments} />

      <EmptyState displayText={headerViralLoads} headerTitle={headerViralLoads} />
    </>
  );
};

export default OtzPatientSummary;
