/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import Resources from './resources/resources.component';
import styles from './root.scss';
import ClinicalDashboardComponent from './clinical-dashboard/clinical-dashboard.component';
import IptReportComponent from './clinical-dashboard/ipt-report/ipt-report.component';

const Root: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {/* <h3 className={styles.welcome}>
        {t("reportsHeader", "Reports Dashboard")}
      </h3>
      <Resources /> */}
      <IptReportComponent />
    </div>
  );
};

export default Root;
