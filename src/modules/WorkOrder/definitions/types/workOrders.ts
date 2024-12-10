export type CreateWorkOrderTabs = 'PLANS' | 'TASKS' | 'ASSETS' | 'USERS';
export type Status = 'IN_PROGRESS' | 'PENDING' | 'WARNING' | 'DONE' | 'TO_DO';
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type DialogState = 'CANCEL' | 'END';

export enum Priorities {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface WorkOrderData {
  name: string;
  description: string;
  signalPriority: Priorities;
}

export interface WorkOrder extends WorkOrderData {
  id: string;
  status: 'TODO' | 'INPROGRESS' | 'DONE';
  isNew: boolean;
}

export interface WorkOrders {
  [key: string]: WorkOrder;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface IColumns {
  [key: string]: IColumn;
}

export interface IData {
  tasks: WorkOrders;
  columns: IColumns;
  columnOrder: string[];
}

export const QueueStates = {
  inProgress: 'inProgress',
  todo: 'to DO',
  ended: 'ended',
};

export interface BoardSocketResponse {
  action:
    | 'AUTOMATIC_CREATE_WORK_QUEUE'
    | 'AUTOMATIC_CREATE_WORK_QUEUE'
    | 'AUTOMATIC_CREATE_WORK_QUEUE';
}
export interface FeedbackState {
  message: string;
  type: 'success' | 'error';
  open: boolean;
}
