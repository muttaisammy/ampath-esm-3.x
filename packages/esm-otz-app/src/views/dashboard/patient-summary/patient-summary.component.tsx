import React from 'react';
import styles from './otz-patientsummary.scss';

const OtzPatientSummary: React.FC = () => {
  return (
    <div className={styles['summary-container']}>
      <h3>Clinical Details</h3>
      <div className={styles.tile}>coming soon</div>
      <h3>Appointments</h3>
      <div className={styles.tile}>coming soon</div>
      <h3>Viral Loads</h3>
      <div className={styles.tile}>coming soon</div>
    </div>
  );
};

export default OtzPatientSummary;
