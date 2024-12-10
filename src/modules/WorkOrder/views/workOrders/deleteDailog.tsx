import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

interface WorkOrder {
  id: string;
  name: string;
}

interface DeleteDialogProps {
  open: boolean; // To control dialog visibility
  selectedTasks: {[key: string]: WorkOrder};
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({open, selectedTasks, onConfirm, onClose}) => {
  const {t, i18n} = useTranslation();

  const selectedTasksCount = Object.keys(selectedTasks).length;

  return (
    <Dialog key={i18n.dir()} dir={i18n.dir()} open={open} onClose={onClose}>
      <DialogTitle>{`${t('workOrders.delete.dialog.title')}`}</DialogTitle>
      <DialogContent>
        <p>
          {selectedTasksCount === 1
            ? `${t('workOrders.delete.dialog.single', {
                taskName: selectedTasks[Object.keys(selectedTasks)[0]].name,
              })}`
            : `${t('workOrders.delete.dialog.multiple', {count: selectedTasksCount})}`}
        </p>
      </DialogContent>
      <DialogActions>
        <Button style={{marginInline: 4}} variant="contained" onClick={onClose} color="primary">
          {`${t('workOrders.delete.dialog.cancel')}`}
        </Button>
        <Button style={{marginInline: 4}} variant="contained" onClick={onConfirm} color="secondary">
          {`${t('workOrders.delete.dialog.confirm')}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
