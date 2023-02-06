import { Board, ToDo } from "../type";
import lodash from "lodash";
import { useCallback } from "react";
import { useUpdateTasks } from "./useUpdateTasks";

// !!! タスクのCRUDをまとめて簡易化で一括処理してます !!!
export const useToDoList = (
  state: Board,
  setState: React.Dispatch<React.SetStateAction<Board>>
) => {
  const { updateTasks } = useUpdateTasks();

  const addTodo = useCallback(
    (toDo: ToDo) => {
      const newState = lodash.cloneDeep(state);
      const newToDoTask = {
        id: "task-" + (state.count + 1),
        content: toDo,
        show: true,
      };
      newState.tasks[newToDoTask.id] = newToDoTask;
      newState.columns["column-1"].taskIds.push(newToDoTask.id);
      newState.count++;
      setState(newState);

      const updateState = lodash.cloneDeep(newState);
      const filteredIds = Object.entries(updateState.tasks)
        .filter(([key, value]) => !value.show)
        .map(([key, value]) => key);
      filteredIds.forEach((id) => (updateState.tasks[id].show = true));
      updateTasks(updateState);
    },
    [setState, state, updateTasks]
  );

  const deleteTodo = useCallback(
    (columnId: string, taskId: string) => {
      const newState = lodash.cloneDeep(state);
      Reflect.deleteProperty(newState.tasks, taskId);
      newState.columns[columnId].taskIds.splice(
        newState.columns[columnId].taskIds.indexOf(taskId),
        1
      );
      setState(newState);

      const updateState = lodash.cloneDeep(newState);
      const filteredIds = Object.entries(updateState.tasks)
        .filter(([key, value]) => !value.show)
        .map(([key, value]) => key);
      filteredIds.forEach((id) => (updateState.tasks[id].show = true));
      updateTasks(updateState);
    },
    [setState, state, updateTasks]
  );

  const editTodo = useCallback(
    (toDo: ToDo, id: string) => {
      const newState = lodash.cloneDeep(state);
      newState.tasks[id].content = toDo;
      setState(newState);

      const updateState = lodash.cloneDeep(newState);
      const filteredIds = Object.entries(updateState.tasks)
        .filter(([key, value]) => !value.show)
        .map(([key, value]) => key);
      filteredIds.forEach((id) => (updateState.tasks[id].show = true));
      updateTasks(updateState);
    },
    [setState, state, updateTasks]
  );

  return { addTodo, editTodo, deleteTodo };
};
