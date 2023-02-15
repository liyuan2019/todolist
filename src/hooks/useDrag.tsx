import { DropResult } from "react-beautiful-dnd";
import { useUpdateTasks } from "./useUpdateTasks";
import { useDispatch, useSelector } from "../store";
import { selectAllTasks, setTasks } from "../store/tasksSlice";

export const useDrag = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);

  const { updateTasks } = useUpdateTasks();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = tasks.columns[source.droppableId];
    const finish = tasks.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...tasks,
        columns: {
          ...tasks.columns,
          [newColumn.id]: newColumn,
        },
      };

      dispatch(setTasks(newState));
      updateTasks(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...tasks,
      columns: {
        ...tasks.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    dispatch(setTasks(newState));
    updateTasks(newState);
  };

  return { onDragEnd };
};
