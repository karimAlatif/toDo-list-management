import React, {FC, useContext} from 'react';
import {Typography} from '@material-ui/core';
import {DraggableProvided} from 'react-beautiful-dnd';
import {WorkOrder, IColumn} from '../../definitions/types/index';
import XDrop from './drop';
import clsx from 'clsx';
import WorkOrderCard from './workOrderCard';
import WorkOrderContext from '../../context/context';
import {useStyles} from './styles';
import {useTranslation} from 'react-i18next';

interface IXColumn {
  className?: string;
  column: IColumn;
  tasks: WorkOrder[];
  provided?: DraggableProvided;
  isDragDisabled: boolean;
  onEdit: (workOrder: WorkOrder) => void;
  onDelete: (workOrder: WorkOrder) => void;
  onChecked: (workOrder: WorkOrder) => void;
}

const XColumn: FC<IXColumn> = ({
  column,
  tasks,
  provided,
  isDragDisabled,
  onEdit,
  onDelete,
  onChecked,
}) => {
  const classes = useStyles();
  const {selectedTasks, isFormOpen} = useContext(WorkOrderContext);
  const {t} = useTranslation();

  return (
    <div className={classes.column}>
      <Typography
        variant={'subtitle2'}
        className={clsx(classes.title, column.id)}
        {...provided?.dragHandleProps}
      >
        <div className={clsx('dot', column.id)} />
        {`${t(`workOrders.list.${column.title}`)}`}
        <Typography variant={'caption'} className={'total-tasks'}>
          {tasks.length}
        </Typography>
      </Typography>
      <XDrop
        isDropDisabled={isDragDisabled}
        droppableId={column.id}
        type="TASK"
        className="task-drop"
      >
        {tasks.map((task, index) => (
          <WorkOrderCard
            key={task.id}
            isChecked={!!(selectedTasks && selectedTasks[task.id] && !isFormOpen)}
            isViewMode={!!Object.keys(selectedTasks).length && !isFormOpen}
            index={index}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onChecked={onChecked}
          />
        ))}
      </XDrop>
    </div>
  );
};

export default XColumn;
