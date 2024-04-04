import React from 'react';
import { useTranslation } from 'react-i18next';
import OTZHomePatientTabs from './views/dashboard/patient-list-tabs/otz-patient-list-tabs.component';
import OTZSummaryTile from './views/dashboard/summary-tiles/otz-summary-tiles.component';
import { OTZHeader } from './header/otz-header.component';
import styles from './otz.scss';

const OtzDashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <OTZHeader />
      <div className={styles.tileLayout}>
        <OTZSummaryTile headerTitle={t('totalEnrolled', 'Total enrolled')} />
        <OTZSummaryTile headerTitle={t('totalActive', 'Total active')} />
        <OTZSummaryTile headerTitle={t('eligibleNotEnrolled', 'Eligible not enrolled')} />
      </div>
      <div className={styles.tabList}>
        <OTZHomePatientTabs />
      </div>
    </React.Fragment>
  );
};

export default OtzDashboard;
