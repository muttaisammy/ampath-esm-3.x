import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@carbon/react';
import styles from './location.scss';
import IptTableComponent from '../clinical-dashboard/ipt-report/ipt-table-component';

export const LocationsComponent = ({ facilitylocations }) => {
  const { t } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState(facilitylocations[0]);

  if (facilitylocations.length)
    return (
      <div>
        <Dropdown
          initialSelectedItem={facilitylocations[0]}
          items={facilitylocations}
          itemToString={(location: { display: string }) =>
            location ? t('locationDisplay', location.display) : t('locationDisplay', '')
          }
          onChange={({ selectedItem }) => setCurrentLocation(selectedItem)}
          selectedItem={currentLocation}
        />
        <div className={styles.container}>
          <h2>{t('iptReportComponent', 'TB Treatment Therapy Report')}</h2>
        </div>
        <IptTableComponent locationUuid={'18c343eb-b353-462a-9139-b16606e6b6c2'} endDate={'2024-02-29'} />
      </div>
    );
};
