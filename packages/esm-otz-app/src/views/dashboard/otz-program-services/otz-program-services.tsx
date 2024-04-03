import React, { useState } from 'react';
import { Tabs, Tab, TabList } from '@carbon/react';
import styles from './common.scss';
import { useTranslation } from 'react-i18next';
import OtzEnrolmentList from './otz-enrolment.component';

const OtzProgramManagementSummary: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('otzEnrolment');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.tabContainer}>
      <Tabs selected={activeTab} onSelectionChange={handleTabChange}>
        <TabList contained>
          <Tab id="otzEnrolment">{t('otzEnrolment', 'OTZ Enrolment')}</Tab>
        </TabList>
      </Tabs>
      {activeTab === 'otzEnrolment' && <OtzEnrolmentList />}
    </div>
  );
};

export default OtzProgramManagementSummary;
