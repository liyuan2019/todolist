import { ToDo } from "../type";
import lodash from "lodash";
import { useCallback } from "react";
import { useUpdateTasks } from "./useUpdateTasks";
import { useDispatch, useSelector } from "../store";
import { selectAllTasks, setTasks } from "../store/tasksSlice";

// !!! タスクのCRUDをまとめて簡易化で一括処理してます !!!
export const useToDoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);

  const { updateTasks } = useUpdateTasks();

  const addTodo = useCallback(
    (toDo: ToDo) => {
      const newState = lodash.cloneDeep(tasks);
      const newToDoTask = {
        id: "task-" + (tasks.count + 1),
        content: toDo,
      };
      newState.tasks[newToDoTask.id] = newToDoTask;
      newState.columns["column-1"].taskIds.push(newToDoTask.id);
      newState.count++;
      dispatch(setTasks(newState));

      // const updateState = lodash.cloneDeep(newState);
      // const filteredIds = Object.entries(updateState.tasks)
      //   .filter(([key, value]) => !value.show)
      //   .map(([key, value]) => key);
      // filteredIds.forEach((id) => (updateState.tasks[id].show = true));
      updateTasks(newState);
    },
    [dispatch, tasks, updateTasks]
  );

  const deleteTodo = useCallback(
    (columnId: string, taskId: string) => {
      const newState = lodash.cloneDeep(tasks);
      Reflect.deleteProperty(newState.tasks, taskId);
      newState.columns[columnId].taskIds.splice(
        newState.columns[columnId].taskIds.indexOf(taskId),
        1
      );
      dispatch(setTasks(newState));

      // const updateState = lodash.cloneDeep(newState);
      // const filteredIds = Object.entries(updateState.tasks)
      //   .filter(([key, value]) => !value.show)
      //   .map(([key, value]) => key);
      // filteredIds.forEach((id) => (updateState.tasks[id].show = true));
      updateTasks(newState);
    },
    [dispatch, tasks, updateTasks]
  );

  const editTodo = useCallback(
    (toDo: ToDo, id: string) => {
      const newState = lodash.cloneDeep(tasks);
      newState.tasks[id].content = toDo;
      dispatch(setTasks(newState));

      // const updateState = lodash.cloneDeep(newState);
      // const filteredIds = Object.entries(updateState.tasks)
      //   .filter(([key, value]) => !value.show)
      //   .map(([key, value]) => key);
      // filteredIds.forEach((id) => (updateState.tasks[id].show = true));
      updateTasks(newState);
    },
    [dispatch, tasks, updateTasks]
  );

  return { addTodo, editTodo, deleteTodo };
};
