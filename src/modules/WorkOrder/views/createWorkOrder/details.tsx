import React, {useCallback, useContext, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Box,
  Button,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  FormControl,
  Dialog,
  DialogActions,
  Select,
  MenuItem,
} from '@material-ui/core';
import {Priorities, WorkOrder, WorkOrderData} from '../../definitions/types/workOrders';
import {useStyles} from './styles';
import WorkOrderContext from '../../context/context';
import {useFormContext} from 'react-hook-form';

export default function ChoosePlans() {
  const {t, i18n} = useTranslation();
  const {
    isFormOpen,
    setIsFormOpen,
    createWorkOrder,
    updateWorkOrder,
    onClearAllSelections,
    selectedTasks,
  } = useContext(WorkOrderContext);

  const form = useFormContext<WorkOrderData>();
  const {register, watch, setValue, errors, handleSubmit} = form;
  const {name, description, signalPriority} = watch();
  const classes = useStyles();

  const getFirstItem = useMemo((): WorkOrder | undefined => {
    const keys = Object.keys(selectedTasks);
    if (keys.length > 0) {
      return selectedTasks[keys[0]]; // Return the first item's value
    }
    return undefined;
  }, [selectedTasks]);

  const isMatchedData = useMemo(
    (): boolean => {
      return (
        name === getFirstItem?.name &&
        description === getFirstItem?.description &&
        signalPriority === getFirstItem?.signalPriority
      );
    },
    [description, getFirstItem, name, signalPriority], // Empty dependency array since comparison doesn't depend on any state or props
  );

  const handleOnClose = useCallback(() => {
    setIsFormOpen(false);
    onClearAllSelections();
  }, [onClearAllSelections, setIsFormOpen]);

  return (
    <Dialog
      key={i18n.dir()}
      open={isFormOpen}
      onClose={handleOnClose}
      maxWidth="sm"
      fullWidth
      style={{direction: i18n.dir()}}
    >
      <DialogTitle>
        <Typography variant="h6" color="primary">
          {getFirstItem ? `${t('workOrders.form.editTitle')}` : `${t('workOrders.form.title')}`}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box display={'flex'} flexDirection={'column'} height={'100%'} mb={2}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'subtitle2'}>{`${t('workOrders.form.name')}`}</Typography>
            <Box mb={2} mt={1}>
              <TextField
                fullWidth
                name="name"
                inputRef={register({
                  required: {
                    value: true,
                    message: `${t('workOrders.form.required')}`,
                  },
                  minLength: {
                    value: 3,
                    message: `${t('workOrders.form.minLength')}`,
                  },
                  maxLength: {
                    value: 18,
                    message: `${t('workOrders.form.maxLength')}`,
                  },
                })}
                size="small"
                placeholder={''}
                defaultValue={name}
                error={Boolean(errors.name)}
                helperText={errors.name && errors.name?.message}
                autoFocus
                variant="outlined"
              />
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'}>
            <FormControl
              error={Boolean(errors.signalPriority)}
              fullWidth={true}
              defaultValue={signalPriority}
              variant="outlined"
              size="small"
            >
              <Typography variant={'subtitle2'}>{`${t('workOrders.form.priority')}`}</Typography>
              <Select
                defaultValue={signalPriority}
                onChange={event => {
                  setValue('signalPriority', event.target.value, {shouldDirty: true});
                }}
                style={{marginTop: 8, marginBottom: 16}}
              >
                {Object.values(Priorities).map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'subtitle2'}>{`${t('workOrders.form.description')}`}</Typography>
            <Box mb={2} mt={1}>
              <TextField
                fullWidth
                multiline
                name="description"
                inputRef={register({
                  required: false,
                  maxLength: {
                    value: 32,
                    message: `${t('workOrders.form.maxLength')}`,
                  },
                })}
                size="medium"
                defaultValue={description}
                error={Boolean(errors.description)}
                helperText={errors.description && errors.description?.message}
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions style={{marginInline: 2}}>
        <Button
          style={{marginInline: 4}}
          onClick={handleOnClose}
          variant="outlined"
          color="secondary"
        >
          {`${t('workOrders.form.cancel')}`}
        </Button>
        <Button
          style={{marginInline: 4}}
          disabled={isMatchedData}
          onClick={handleSubmit((data: WorkOrderData) => {
            if (getFirstItem) {
              updateWorkOrder({
                ...getFirstItem,
                ...data,
              });
            } else {
              createWorkOrder(data);
            }
          })}
          variant="contained"
          color="primary"
        >
          {getFirstItem ? `${t('workOrders.form.update')}` : `${t('workOrders.form.create')}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
