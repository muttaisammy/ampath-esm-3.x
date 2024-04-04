import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import styles from './otz-patient-list-tabs.scss';
import MissedAppointments from './otz-patient-list-tables/missed-appointments.component';
import EligibleForVLTest from './otz-patient-list-tables/eligible-for-vl-testing.component';
import TotalEnrolled from './otz-patient-list-tables/total-enrolled.component';
import TotalActive from './otz-patient-list-tables/total-active.component';
import EligibleNotEnrolled from './otz-patient-list-tables/eligible-not-enrolled.component';

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
          <TabPanel>
            <MissedAppointments />
          </TabPanel>
          <TabPanel>
            <EligibleForVLTest />
          </TabPanel>
          <TabPanel>
            <TotalEnrolled />
          </TabPanel>
          <TabPanel>
            <TotalActive />
          </TabPanel>
          <TabPanel>
            <EligibleNotEnrolled />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default OTZHomePatientTabs;
