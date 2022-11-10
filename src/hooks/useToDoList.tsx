import { Board, ToDo } from "@/type";
import lodash from "lodash";
import { useCallback } from "react";

export const useToDoList = (
  state: Board,
  setState: React.Dispatch<React.SetStateAction<Board>>
) => {
  const addTodo = useCallback(
    (toDo: ToDo) => {
      const newState = lodash.cloneDeep(state);
      const newToDoTask = {
        id: "task-" + state.columns["column-1"].taskIds.length,
        content: toDo,
      };
      newState.tasks[newToDoTask.id] = newToDoTask;
      newState.columns["column-1"].taskIds.push(newToDoTask.id);

      setState(newState);
    },
    [setState, state]
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
    },
    [setState, state]
  );

  const editTodo = useCallback(
    (toDo: ToDo, id: string) => {
      const newState = lodash.cloneDeep(state);
      newState.tasks[id].content = toDo;

      setState(newState);
    },
    [setState, state]
  );

  return { addTodo, editTodo, deleteTodo };
};
