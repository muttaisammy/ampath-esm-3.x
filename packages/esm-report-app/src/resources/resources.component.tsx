import React from 'react';
import { ClickableTile } from '@carbon/react';
import { ChevronRight } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import styles from './resources.scss';
import ClinicalDashboardComponent from '../clinical-dashboard/clinical-dashboard.component';

function Resources() {
  const { t } = useTranslation();

  return (
    <div className={styles.resources}>
      {/* <div className={styles.cardsContainer}>
        <Card
          title={t("clinical", "Clinical Dashboard")}
          subtitle={
            t("clinicalDashboard", "View Clinical Reports") + "."
          }
          link="#"
        />
        <Card
          title={t("analytics", "Analytics Dashboard")}
          subtitle={
            t("analyticsDashboard", "View Analytics Reports") + "."
          }
          link="#"
        />
      </div> */}
    </div>
  );
}

function Card({ title, subtitle, link }: { title: string; subtitle: string; link: string }) {
  return (
    <ClickableTile className={styles.card} href={link} target="_blank" rel="noopener noreferrer">
      <div className={styles.cardContent}>
        <div className={styles.title}>
          <h4>{title}</h4>
          <ChevronRight />
        </div>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </ClickableTile>
  );
}

export default Resources;
