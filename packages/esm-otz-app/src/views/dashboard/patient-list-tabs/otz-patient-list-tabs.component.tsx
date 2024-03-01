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

  // const tabsConfigs = useMemo(
  //   () => [
  //     {
  //       label: t('allOTZClients', 'All OTZ Clients'),
  //       cohortId: '', //to be passed via config
  //       isReportingCohort: true,
  //       cohortSlotName: 'otz-clients-slot',
  //       launchableForm: {
  //         editActionText: t('editOtzForm', 'Edit OTZ form'),
  //         editLatestEncounter: true,
  //         targetDashboard: 'covid-assessments',
  //         name: 'OTZ  Form',
  //       },
  //       associatedEncounterType: config.obsConcepts.covidCaseAssessmentEncType,
  //       excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
  //       otherColumns: [
  //         {
  //           key: 'assessmentDate',
  //           header: t('assessmentDate', 'Assessment date'),
  //           getValue: ({ latestEncounter }) => {
  //             return '';
  //             //return latestEncounter && dayjs(latestEncounter.encounterDatetime).format('DD-MMM-YYYY');
  //           },
  //           index: 3,
  //         },
  //         {
  //           key: 'finalAssessment',
  //           header: t('finalResults', 'Final result'),
  //           getValue: ({ latestExtraEncounters }) => {
  //             //   const pcrResult = getObsFromEncounters(latestExtraEncounters, config.obsConcepts.pcrTestResult);
  //             //   return pcrResult && pcrResult != '--'
  //             //     ? pcrResult
  //             //     : getObsFromEncounters(latestExtraEncounters, config.obsConcepts.rapidTestResult);
  //             return '';
  //           },
  //         },
  //         {
  //           key: 'outcome',
  //           header: t('outcome', 'Outcome'),
  //           getValue: ({ latestEncounter }) => {
  //             //return getObsFromEncounter(latestEncounter, config.obsConcepts.covidOutcome);
  //             return '';
  //           },
  //         },
  //       ],
  //       extraAssociatedEncounterTypes: [config.obsConcepts.covidLabTestEncType],
  //     },
  //     {
  //       label: t('tab2', 'Tab 2'),
  //       cohortId: config.cohorts.covidClientsWithPendingLabResults,
  //       isReportingCohort: true,
  //       cohortSlotName: 'tab2-slot',
  //       // launchableForm: {
  //       //   name: 'COVID Lab Test',
  //       //   editActionText: 'Enter test result',
  //       //   editLatestEncounter: true,
  //       //   targetDashboard: 'covid-lab-results',
  //       // },
  //       //excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
  //       associatedEncounterType: config.obsConcepts.covidCaseAssessmentEncType,
  //       otherColumns: [
  //         {
  //           key: 'testDate',
  //           header: t('testDate', 'Test Date'),
  //           getValue: ({ latestEncounter }) => {
  //             return getObsFromEncounter(latestEncounter, config.obsConcepts.dateSpecimenCollected, true);
  //           },
  //         },
  //         {
  //           key: 'testType',
  //           header: t('testType', 'Test Type'),
  //           getValue: ({ latestEncounter }) => {
  //             return getObsFromEncounter(latestEncounter, config.obsConcepts.covidTestType);
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   [],
  // );
  // return <OHRIPatientListTabs patientListConfigs={tabsConfigs} moduleName={moduleName} />;
  return <>{/* <EmptyStateComingSoon displayText="" headerTitle="" /> */}</>;
}

export default OTZHomePatientTabs;
