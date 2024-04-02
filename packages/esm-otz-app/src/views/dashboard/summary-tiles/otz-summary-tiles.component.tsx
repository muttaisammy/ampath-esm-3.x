import React from 'react';
import { Tile } from '@carbon/react';
import styles from './otz-summary-tile.scss';
interface SummaryTileProps {
  headerTitle: string;
}

const OTZSummaryTile: React.FC<SummaryTileProps> = ({ headerTitle }) => {
  return (
    <React.Fragment>
      <Tile className={styles.tileContainer}>
        <div>
          <div className={styles.tileContent}>
            <div className={styles.tileHeader}>
              <header>{headerTitle}</header>
            </div>
            <div className={styles.displayDetails}>
              <div>Patients</div>
              <div className={styles.displayData}>{0}</div>
            </div>
          </div>
        </div>
      </Tile>
    </React.Fragment>
  );
};

export default OTZSummaryTile;
