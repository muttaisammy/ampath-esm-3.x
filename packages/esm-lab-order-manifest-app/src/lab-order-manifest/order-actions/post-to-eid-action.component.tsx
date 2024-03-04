import React, { useCallback } from 'react';
import { OverflowMenuItem, OverflowMenu } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { showModal } from '@openmrs/esm-framework';
import { type Result } from '../manifest-orders-list-resource';

interface PostEidOrderOverflowMenuItemProps {
  order: Result;
}

const RejectOrderOverflowMenuItem: React.FC<PostEidOrderOverflowMenuItemProps> = ({ order }) => {
  const { t } = useTranslation();

  const handlePostEidOrderModel = useCallback(() => {
    const dispose = showModal('post-lab-order-to-eid-component', {
      closeModal: () => dispose(),
      order,
    });
  }, [order]);
  return (
    <OverflowMenuItem
      itemText={t('postOrder', 'Post Order')}
      onClick={handlePostEidOrderModel}
      style={{
        maxWidth: '100vw',
      }}
      isDelete={true}
      hasDivider
    />
  );
};

export default RejectOrderOverflowMenuItem;
