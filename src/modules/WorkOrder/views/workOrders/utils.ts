/**
 *
 */
export const clone = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
/**
 * 是否拖拽到了其他面板
 * @param {起点} source
 * @param {终点} destination
 */
//@ts-ignore
export const onChange = (source, destination) => {
  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return true;
  }
  return false;
};
/**
 *
 */
//@ts-ignore
export const deleteTask = (data, {droppableId, index}) => {
  data = clone(data);
  data.columns[droppableId].taskIds.splice(index, 1);
  return data;
};
/**
 *
 */
//@ts-ignore
export const addTask = (data, {droppableId, index}, taskId) => {
  data = clone(data);
  data.columns[droppableId].taskIds.splice(index, 0, taskId);
  return data;
};
