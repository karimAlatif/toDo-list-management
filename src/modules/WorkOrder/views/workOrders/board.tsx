import React, {useContext} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import XDrop from './drop';
import XDrag from './drag';
import XColumn from './column';
import {useStyles} from './styles';
import WorkOrderContext from '../../context/context';
import {WorkOrder} from '../../definitions/types/index';

export default function Board() {
  const classes = useStyles();
  const {isLoading, data, setIsFormOpen, onDragEnd, onSelectTask, setIsDeleteDialogOpen} =
    useContext(WorkOrderContext);

  return (
    <>
      {isLoading ? (
        <>{'LOADING'}</>
      ) : (
        <DragDropContext onDragEnd={data => onDragEnd(data)}>
          <XDrop
            className={classes.container}
            droppableId="all-columns"
            type="COLUMN"
            direction="horizontal"
            mode="virtual"
            isDropDisabled={true}
          >
            {data?.columnOrder.map((columnId: string, index: number) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId: string) => data.tasks[taskId]);
              return (
                <XDrag key={columnId} draggableId={columnId} index={index} dragAll={false}>
                  <XColumn
                    onEdit={(workdOrder: WorkOrder) => {
                      onSelectTask(workdOrder);
                      setIsFormOpen(true);
                    }}
                    onDelete={(workdOrder: WorkOrder) => {
                      onSelectTask(workdOrder);
                      setIsDeleteDialogOpen(true);
                    }}
                    onChecked={(workdOrder: WorkOrder) => {
                      onSelectTask(workdOrder);
                    }}
                    column={column}
                    tasks={tasks}
                    isDragDisabled={false}
                  />
                </XDrag>
              );
            })}
          </XDrop>
        </DragDropContext>
      )}
    </>
  );
}
