import {useCallback, useState, useEffect} from 'react';
import {
  FeedbackState,
  IData,
  WorkOrder,
  WorkOrderData,
  WorkOrders,
} from '../definitions/types/index';
import {DropResult} from 'react-beautiful-dnd';
import {dataArr} from './data';
import {v4 as uuidv4} from 'uuid';

const TODO = 'To Do';
const INPROGRESS = 'In Progress';
const DONE = 'Done';
const localStorageKey = 'boardData';

function useWorkOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>({
    message: '',
    type: 'success',
    open: false,
  });
  const [selectedTasks, setSelectedTasks] = useState<{[key: string]: WorkOrder}>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [data, setData] = useState<IData>({
    columnOrder: [],
    columns: {},
    tasks: {},
  });

  const saveDataToLocalStorage = useCallback((key: string, data: IData) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }, []);

  const getDataFromLocalStorage = useCallback((key: string): IData | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving from local storage', error);
      return null;
    }
  }, []);

  const setBoardData = useCallback((_tasks: WorkOrder[]): IData => {
    return {
      tasks: _tasks.reduce((obj, item) => Object.assign(obj, {[item.id]: {...item}}), {}),
      columns: {
        'column-1': {
          id: 'column-1',
          title: TODO,
          taskIds: _tasks.filter(item => item.status === 'TODO').map(item => item.id),
        },
        'column-2': {
          id: 'column-2',
          title: INPROGRESS,
          taskIds: _tasks.filter(item => item.status === 'INPROGRESS').map(item => item.id),
        },
        'column-3': {
          id: 'column-3',
          title: DONE,
          taskIds: _tasks.filter(item => item.status === 'DONE').map(item => item.id),
        },
      },
      columnOrder: ['column-1', 'column-2', 'column-3'],
    };
  }, []);

  const onDragEnd = useCallback((res: DropResult) => {
    const {source, destination, draggableId} = res;
    if (destination) {
      // let newTask: WorkOrder[] = [];
      const targetStatus =
        destination.droppableId === 'column-1'
          ? 'TODO'
          : destination.droppableId === 'column-2'
          ? 'INPROGRESS'
          : 'DONE';

      setData((prevData: IData) => {
        const newData: IData = {...prevData}; // Explicitly type the new data

        const newTasks: WorkOrders = {
          ...newData.tasks,
          [draggableId]: {
            ...newData.tasks[draggableId],
            status: targetStatus,
          },
        };
        newData.tasks = newTasks;

        //remove id
        newData.columns[source.droppableId].taskIds = newData.columns[
          source.droppableId
        ].taskIds.filter(id => id !== draggableId);
        //add id
        newData.columns[destination.droppableId].taskIds.splice(destination.index, 0, draggableId);
        saveDataToLocalStorage(localStorageKey, newData);
        return newData;
      });

      // setTasks(prevTasks => {
      //   newTask = [...prevTasks];
      //   const targetTask = newTask.find(task => task.id === draggableId);
      //   if (targetTask) {
      //     targetTask.status = targetStatus;
      //     return newTask;
      //   } else {
      //     return prevTasks;
      //   }
      // });
      // setData(setBoardData(newTask));
    }
  }, []);

  const showFeedback = useCallback((message: string, type: 'success' | 'error') => {
    setFeedback({message, type, open: true});
  }, []);

  const closeFeedback = useCallback(() => {
    setFeedback(prev => ({...prev, open: false}));
  }, []);

  const onSelectTask = useCallback((task: WorkOrder) => {
    setSelectedTasks(prevTasks => {
      const newTasks = {...prevTasks};

      if (newTasks[task.id]) {
        // If the task exists, remove it
        delete newTasks[task.id];
      } else {
        // If the task doesn't exist, add it
        newTasks[task.id] = task;
      }

      return newTasks;
    });
  }, []);

  const onClearAllSelections = useCallback(() => {
    setSelectedTasks({});
  }, []);

  const createWorkOrder = useCallback(
    (workOrderData: WorkOrderData) => {
      const newTask: WorkOrder = {
        ...workOrderData,
        id: uuidv4(),
        isNew: true,
        status: 'TODO',
      };

      setData((prevData: IData) => {
        const newData: IData = {...prevData}; // Explicitly type the new data
        //adding
        const newTasks = {...newData.tasks};
        newTasks[newTask.id] = newTask;
        newData.tasks = newTasks;
        //order
        newData.columns &&
          newData.columns['column-1'] &&
          newData.columns['column-1'].taskIds.unshift(newTask.id);

        saveDataToLocalStorage(localStorageKey, newData);
        return newData;
      });
      setIsFormOpen(false);
      showFeedback('success_message_key', 'success');
    },
    [saveDataToLocalStorage, showFeedback],
  );

  const updateWorkOrder = useCallback(
    (workOrderData: WorkOrder) => {
      setData(prevData => {
        const newData = {...prevData};
        //adding
        const newTasks = {...newData.tasks};
        newTasks[workOrderData.id] = {...workOrderData};
        newData.tasks = newTasks;

        saveDataToLocalStorage(localStorageKey, newData);
        return newData;
      });
      setIsFormOpen(false);
      onClearAllSelections();
      showFeedback('success_message_key', 'success');
    },
    [onClearAllSelections, saveDataToLocalStorage, showFeedback],
  );

  const deleteWorkOrders = useCallback(() => {
    setData(prevData => {
      const newData = {...prevData};
      const newTasks = {...newData.tasks};
      const selectedOrdersKeys = new Set([...Object.keys(selectedTasks)]);

      selectedOrdersKeys.forEach(key => {
        if (newTasks[key]) {
          delete newTasks[key];
          // //order
          newData.columns['column-1'].taskIds = newData.columns['column-1'].taskIds.filter(
            id => id !== key,
          );
        }
      });

      newData.tasks = newTasks;
      saveDataToLocalStorage(localStorageKey, newData);
      return newData;
    });

    setIsDeleteDialogOpen(false);
    onClearAllSelections();
    showFeedback('success_message_key', 'success');
  }, [onClearAllSelections, saveDataToLocalStorage, selectedTasks, showFeedback]);

  useEffect(() => {
    const boardData = getDataFromLocalStorage(localStorageKey);
    if (boardData && Object.keys(boardData.tasks).length) {
      Object.values(boardData.tasks).forEach(workOrder => {
        //make it is old
        workOrder.isNew = false;
      });
      setData(boardData);
    } else {
      setData(setBoardData(dataArr as any));
    }
  }, []);

  return {
    isLoading,
    data,
    isFormOpen,
    feedback,
    selectedTasks,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createWorkOrder,
    updateWorkOrder,
    deleteWorkOrders,
    onSelectTask,
    onClearAllSelections,
    showFeedback,
    closeFeedback,
    setIsFormOpen,
    setData,
    onDragEnd,
  };
}

export default useWorkOrder;
