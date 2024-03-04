import React, { useState } from 'react';

import {
  Button,
  ContentSwitcher,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  TextArea,
  Grid,
  Checkbox,
  TextInput,
  IconButton,
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import styles from './post-orde-to-eid-dialog.scss';
import { type Result } from '../manifest-orders-list-resource';
import { PostToEid } from './post-to-eid-dialog.resource';
import { showNotification, showSnackbar } from '@openmrs/esm-framework';
import { Card } from '@ampath/esm-patient-registration-app/src/patient-verification/verification.component';

interface PostOrderDialogProps {
  order: Result;
  closeModal: () => void;
}

const PostEidOrderDialog: React.FC<PostOrderDialogProps> = ({ order, closeModal }) => {
  const { t } = useTranslation();

  const [notes, setNotes] = useState('');

  const postOrder = async (event) => {
    event.preventDefault();
    // TODO Clean up for amrs posting to nascop eid
    const payload = {
      fulfillerStatus: 'EXCEPTION',
      fulfillerComment: notes,
    };
    PostToEid(order.uuid, payload).then(
      (resp) => {
        showSnackbar({
          isLowContrast: true,
          title: t('postOrder', 'Post Order'),
          kind: 'success',
          subtitle: t(
            'successfullyPosted',
            `You have successfully posted an Order with OrderNumber ${order.orderNumber} `,
          ),
        });
        closeModal();
      },
      (err) => {
        showNotification({
          title: t(`errorRejectingOrder', 'Error Rejecting the order`),
          kind: 'error',
          critical: true,
          description: err?.message,
        });
      },
    );
  };

  return (
    <div>
      <Form onSubmit={postOrder}>
        <ModalHeader closeModal={closeModal} title={t('postOrder', 'Post Order To EID')} />
        <ModalBody>
          <div className={styles.modalBody}>
            <section className={styles.section}>
              <h5 className={styles.section}>
                {order?.accessionNumber} &nbsp; · &nbsp;{order?.fulfillerStatus} &nbsp; · &nbsp;
                {order?.orderNumber}
                &nbsp;
              </h5>
            </section>
            <br />
            <section className={styles.section}>
              <Card label="Client ID (CCC Number)" value="" />
              <TextArea
                labelText={t('notes', 'Enter Comments ')}
                id="nextNotes"
                name="nextNotes"
                invalidText="Required"
                helperText="Please enter comment"
                maxCount={500}
                enableCounter
                onChange={(e) => setNotes(e.target.value)}
              />
            </section>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button kind="secondary" onClick={closeModal}>
            {t('cancel', 'Cancel')}
          </Button>
          <Button kind="success" type="submit">
            {t('postToEid', 'Post To EID')}
          </Button>
        </ModalFooter>
      </Form>
    </div>
  );
};

export default PostEidOrderDialog;
