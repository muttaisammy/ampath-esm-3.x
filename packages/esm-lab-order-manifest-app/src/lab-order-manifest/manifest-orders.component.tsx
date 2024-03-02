import React from 'react';
import { Search } from '@carbon/react';
import styles from './manifest-styles.scss';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import ManifestOrdersList from './manifest-orders-list';

const ManifestOrders = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.orderTabsContainer}>
      <div className={styles.searchContainer}>
        <Search
          closeButtonLabelText={t('clearSearchInput', 'Clear search input')}
          placeholder={t('searchByPatientIdOrName', 'Search by patient ID or name')}
          labelText={t('searchByPatientIdOrName', 'Search by patient ID or name')}
          onChange={(e) => {
            e.preventDefault();
            // setSearchTermUserInput(e.target.value);
          }}
          size="md"
          className={styles.patientSearch}
        />
      </div>
      <div>
        <h5>Order list</h5>
        <ManifestOrdersList />
      </div>
    </section>
  );
};

export default ManifestOrders;
