import React, {useContext, useEffect, useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Priorities, WorkOrderData} from '../../definitions/types/workOrders';
import WorkOrderDetails from './details';
import WorkOrderContext from '../../context/context';

export default function CreateWorkOrder() {
  const {selectedTasks} = useContext(WorkOrderContext);

  const getFirstItem = useMemo((): WorkOrderData | undefined => {
    const keys = Object.keys(selectedTasks);
    if (keys.length > 0) {
      return selectedTasks[keys[0]]; // Return the first item's value
    }
    return undefined;
  }, [selectedTasks]);

  const form = useForm<WorkOrderData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: getFirstItem?.name || '',
      description: getFirstItem?.description || '',
      signalPriority: getFirstItem?.signalPriority || Priorities.MEDIUM,
    },
  });
  const {register, unregister} = form;

  useEffect(() => {
    register('name');
    register('description');
    register('signalPriority');

    return () => {
      unregister('name');
      unregister('description');
      unregister('signalPriority');
    };
  }, []);

  return (
    <FormProvider {...form}>
      <WorkOrderDetails />
    </FormProvider>
  );
}
