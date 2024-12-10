import React, {useMemo} from 'react';
import XDrag from './drag';
import {Box, Checkbox, Typography, Chip, IconButton} from '@material-ui/core';
import {SignalCellularAlt, Delete, Edit} from '@material-ui/icons';
import {WorkOrder} from '../../definitions/types/index';
import {useStyles} from './styles';

interface Props {
  task: WorkOrder;
  index: number;
  isChecked: boolean;
  isViewMode: boolean;
  onEdit: (workOrder: WorkOrder) => void;
  onDelete: (workOrder: WorkOrder) => void;
  onChecked: (workOrder: WorkOrder) => void;
}

export default function WorkOrderCard({
  task,
  index,
  isChecked,
  isViewMode,
  onEdit,
  onDelete,
  onChecked,
}: Props) {
  const classes = useStyles();

  const isToDoElement = useMemo(() => {
    return task && task.status === 'TODO';
  }, [task]);

  return (
    <XDrag draggableId={task.id} index={index} key={task.id}>
      <div className="card">
        <Box mb={2} display={'flex'} alignItems={'flex-start'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'center'}>
            {isToDoElement && (
              <Checkbox
                style={{padding: '10px 0px', marginRight: '10px'}}
                color={'primary'}
                checked={isChecked}
                onChange={() => {
                  onChecked(task);
                }}
              />
            )}
            <Box>
              <Box display={'flex'} alignItems={'center'}>
                <SignalCellularAlt
                  style={{
                    fill:
                      task.signalPriority === 'HIGH'
                        ? '#ec675a'
                        : task.signalPriority === 'MEDIUM'
                        ? '#f6ca45'
                        : '#82cf6e',
                  }}
                  fontSize="small"
                />
                <Typography variant={'body2'} style={{marginLeft: '8px'}}>
                  {task.name}
                </Typography>
                {task.isNew && (
                  <Chip
                    label="New"
                    size="small"
                    style={{
                      background: '#e4eafb',
                      color: '#6383ed',
                      fontWeight: 'bold',
                      marginLeft: 8,
                    }}
                  />
                )}
              </Box>
              <Typography
                variant={'body2'}
                style={{marginLeft: '8px', marginTop: '8px', color: '#9aa7bf'}}
              >
                {task.name}
              </Typography>
            </Box>
          </Box>
          {isToDoElement && !isViewMode && (
            <Box>
              <IconButton
                aria-label="Edit"
                size="small"
                onClick={() => {
                  onEdit(task);
                }}
              >
                <Edit color="action" />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => {
                  onDelete(task);
                }}
              >
                <Delete color="error" />
              </IconButton>
            </Box>
          )}
        </Box>

        {/*  */}
        <Box mb={2} display={'flex'} alignItems={'flex-start'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'center'}>
            <Box>
              <Typography variant={'body2'} style={{marginLeft: '8px', color: '#9aa7bf'}}>
                {task.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </XDrag>
  );
}
