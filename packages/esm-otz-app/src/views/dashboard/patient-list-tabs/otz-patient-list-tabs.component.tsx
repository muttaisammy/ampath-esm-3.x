import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EmptyStateComingSoon,
  findObs,
  getObsFromEncounter,
  getObsFromEncounters,
  OHRIPatientListTabs,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';
import dayjs from 'dayjs';

function OTZHomePatientTabs() {
  const { t } = useTranslation();
  const config = useConfig();

  return <>{/* <EmptyStateComingSoon displayText="" headerTitle="" /> */}</>;
}

export default OTZHomePatientTabs;
