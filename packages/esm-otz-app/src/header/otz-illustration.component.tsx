import React from 'react';
import { Medication } from '@carbon/react/icons';
import styles from './otz-header.scss';

const OTZIllustration: React.FC = () => {
  return (
    <div className={styles.svgContainer}>
      <Medication className={styles.iconOverrides} />
    </div>
  );
};

export default OTZIllustration;
