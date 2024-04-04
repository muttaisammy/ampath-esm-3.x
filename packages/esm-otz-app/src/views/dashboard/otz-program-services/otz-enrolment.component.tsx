import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@openmrs/esm-patient-common-lib';
const otzEnrolmentList: React.FC = () => {
  const { t } = useTranslation();

  const headerOtzEnrolment = t('otzEnrolment', 'OTZ Enrolment');

  return (
    <>
      <EmptyState displayText={headerOtzEnrolment} headerTitle={headerOtzEnrolment} />
    </>
  );
};

export default otzEnrolmentList;
