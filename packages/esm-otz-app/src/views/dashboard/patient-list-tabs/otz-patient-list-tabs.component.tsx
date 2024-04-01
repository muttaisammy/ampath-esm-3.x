import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Checkbox, Button, TextInput } from '@carbon/react';
import styles from './otz-patient-list-tabs.scss';

function OTZHomePatientTabs() {
  const { t } = useTranslation();

  return (
    <div className={styles.tabs}>
      <Tabs>
        <TabList aria-label="List of tabs" contained>
          <Tab>{t('missedAppointments', 'Missed Appointments')}</Tab>
          <Tab>{t('vlEligible', 'ELigible for Viral Load Testing')}</Tab>
          <Tab>{t('totalEnrolled', 'Total Enrolled')}</Tab>
          <Tab>{t('totalActive', 'Total active')}</Tab>
          <Tab>{t('eligibleNotEnrolled', 'Eligible Not Enrolled')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default OTZHomePatientTabs;
