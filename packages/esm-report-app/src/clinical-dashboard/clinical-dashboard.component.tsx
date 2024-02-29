import React, { useState } from 'react';
import { Button, InlineLoading, Tile } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import styles from './clinical-dashboard.scss';

function ClinicalDashboardComponent() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1>{t('clinicalDashboard', 'Clinical Dashboard')}</h1>
    </div>
  );
}

export default ClinicalDashboardComponent;
