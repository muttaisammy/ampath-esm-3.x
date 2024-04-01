import React from 'react';
import OTZHomePatientTabs from './views/dashboard/patient-list-tabs/otz-patient-list-tabs.component';
import OTZSummaryTile from './views/dashboard/summary-tiles/otz-summary-tiles.component';
import { OTZHeader } from './header/otz-header.component';
import styles from './otz.scss';

const OtzDashboard: React.FC = () => {
  //otz data fetched here, and reused across components

  return (
    <>
      <div>
        <OTZHeader />
      </div>
      <div className={styles.tileLayout}>
        <OTZSummaryTile />
        <OTZSummaryTile />
        <OTZSummaryTile />
      </div>
      <div className={styles.tabList}>
        <OTZHomePatientTabs />
      </div>
    </>
  );
};

export default OtzDashboard;
