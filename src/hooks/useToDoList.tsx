import { Board, ToDo } from "@/type";
import lodash from "lodash";
import { useCallback } from "react";
import { useUpdateTasks } from "./useUpdateTasks";

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
      };
      newState.tasks[newToDoTask.id] = newToDoTask;
      newState.columns["column-1"].taskIds.push(newToDoTask.id);
      newState.count++;

      setState(newState);
      updateTasks(newState);
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
      updateTasks(newState);
    },
    [setState, state, updateTasks]
  );

  const editTodo = useCallback(
    (toDo: ToDo, id: string) => {
      const newState = lodash.cloneDeep(state);
      newState.tasks[id].content = toDo;

      setState(newState);
      updateTasks(newState);
    },
    [setState, state, updateTasks]
  );

  return { addTodo, editTodo, deleteTodo };
};
