import React from 'react';
import OTZHomePatientTabs from './views/dashboard/patient-list-tabs/otz-patient-list-tabs.component';
import OTZSummaryTiles from './views/dashboard/summary-tiles/otz-summary-tiles.component';
import { OTZHeader } from './header/otz-header.component';

const OtzDashboard: React.FC = () => {
  return (
    <div className={`omrs-main-content`}>
      <OTZHeader />
      {/* <OTZSummaryTiles /> */}
      <OTZHomePatientTabs />
    </div>
  );
};

export default OtzDashboard;
