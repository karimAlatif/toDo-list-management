import React from 'react';
import {IData, WorkOrder, WorkOrderData} from '../definitions/types/index';
import {DropResult} from 'react-beautiful-dnd';

type State = {
  data: IData | undefined;
  isFormOpen: boolean;
  isLoading: boolean;
  isDeleteDialogOpen: boolean;
  selectedTasks: {[key: string]: WorkOrder};
  setIsFormOpen: (state: boolean) => void;
  onDragEnd: (res: DropResult) => void;
  createWorkOrder: (workOrderData: WorkOrderData) => void;
  updateWorkOrder: (workOrderData: WorkOrder) => void;
  deleteWorkOrders: () => void;
  setIsDeleteDialogOpen: (state: boolean) => void;
  onSelectTask: (task: WorkOrder) => void;
  onClearAllSelections: () => void;
};

const WorkOrderContext = React.createContext<State>({
  data: undefined,
  isFormOpen: false,
  isLoading: false,
  selectedTasks: {},
  isDeleteDialogOpen: false,
  setIsFormOpen: (state: boolean) => {},
  setIsDeleteDialogOpen: (state: boolean) => {},
  onDragEnd: (res: DropResult) => {},
  createWorkOrder: (workOrderData: WorkOrderData) => {},
  updateWorkOrder: (workOrderData: WorkOrderData) => {},
  deleteWorkOrders: () => {},
  onSelectTask: (task: WorkOrder) => {},
  onClearAllSelections: () => {},
});
export default WorkOrderContext;
