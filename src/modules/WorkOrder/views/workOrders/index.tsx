import React from 'react';
import {Box, Button, Snackbar, SnackbarContent} from '@material-ui/core';
import {Delete, CallMerge} from '@material-ui/icons';
import WorkOrderContext from '../../context/context';
import useWorkOrders from '../../actions/useWorkOrders';
import {useStyles} from './styles';
import LanguageSwitcher from 'shared/components/LanguageSwitcher';

import Board from './board';
import CreateWorkOrder from '../createWorkOrder';
import {useTranslation} from 'react-i18next';
import DeleteDialog from './deleteDailog';

export default function WorkOrdersLayout() {
  const {
    isLoading,
    data,
    isFormOpen,
    feedback,
    selectedTasks,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createWorkOrder,
    setIsFormOpen,
    updateWorkOrder,
    deleteWorkOrders,
    onSelectTask,
    onClearAllSelections,
    closeFeedback,
    onDragEnd,
  } = useWorkOrders();

  const {t, i18n} = useTranslation();
  const classes = useStyles();

  const getStyles = (type: 'success' | 'error') => {
    switch (type) {
      case 'success':
        return {backgroundColor: '#4caf50'}; // Green for success
      case 'error':
        return {backgroundColor: '#f44336'}; // Red for error
      default:
        return {};
    }
  };

  return (
    <div>
      <LanguageSwitcher />
      <Box className={classes.actionContainer}>
        {/* Delete Button */}
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          disabled={!Object.keys(selectedTasks).length || isFormOpen}
          startIcon={<Delete />}
          onClick={() => {
            setIsDeleteDialogOpen(true);
          }}
        >
          {`${t('workOrders.delete.deleteWithCount', {
            count: isFormOpen ? 0 : Object.keys(selectedTasks).length,
          })}`}
        </Button>

        {/* Add Button */}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!!Object.keys(selectedTasks).length}
          startIcon={<CallMerge />}
          onClick={() => {
            setIsFormOpen(true);
          }}
        >
          {`${t('workOrders.list.add')}`}
        </Button>
      </Box>
      <WorkOrderContext.Provider
        value={{
          data,
          isFormOpen,
          isLoading,
          selectedTasks,
          isDeleteDialogOpen,
          setIsDeleteDialogOpen,
          setIsFormOpen,
          onDragEnd,
          createWorkOrder,
          onSelectTask,
          onClearAllSelections,
          updateWorkOrder,
          deleteWorkOrders,
        }}
      >
        <Board />
        <CreateWorkOrder key={String(isFormOpen)} />
      </WorkOrderContext.Provider>

      <DeleteDialog
        key={String(isDeleteDialogOpen)}
        open={isDeleteDialogOpen}
        selectedTasks={selectedTasks}
        onConfirm={() => {
          deleteWorkOrders();
        }}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          onClearAllSelections();
        }}
      />
      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={closeFeedback}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <SnackbarContent style={getStyles(feedback.type)} message={`${t(feedback.message)}`} />
      </Snackbar>
    </div>
  );
}
