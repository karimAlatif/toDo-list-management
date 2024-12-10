import React, {FC, ReactNode} from 'react';
import {Droppable, DroppableProps} from 'react-beautiful-dnd';
import {useStyles} from './styles';
import clsx from 'clsx';

interface IXDrop extends Omit<DroppableProps, 'children'> {
  children: ReactNode;
  className?: string;
}

const XDrop: FC<IXDrop> = ({children, className, ...props}) => {
  const classes = useStyles();
  return (
    <Droppable {...props}>
      {(provided, snapshot) => (
        <div
          {...provided.innerRef}
          ref={provided.innerRef}
          // style={{display: 'flex'}}
          className={clsx(className, classes.dropContainer, {dragOver: snapshot.isDraggingOver})}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default XDrop;
