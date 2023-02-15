import { ToDo, Priority } from "../type";
import { ChangeEvent, useEffect, useState } from "react";
import { useToDoList } from "./useToDoList";
import { resetTaskModal } from "../store/taskModalSlice";
import { RootState, useDispatch, useSelector } from "../store";

export const useTaskModal = () => {
  const today = new Date().toLocaleDateString();
  const dispatch = useDispatch();
  const { addTodo, editTodo, deleteTodo } = useToDoList();
  const { todo, editColumnId, editTaskId } = useSelector(
    (state: RootState) => state.taskModal
  );

  const [title, setTitle] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [toDoDate, setTodoDate] = useState<string>(today);
  const [subTask, setSubTask] = useState<string[]>([]);
  const [priority, setPriority] = useState<Priority>("medium");
  const [projectName, setProjectName] = useState<string>("未分類");

  useEffect(() => {
    setTitle(todo.title);
    setMemo(todo.memo);
    setTodoDate(todo.toDoDate);
    setSubTask(todo.subTask);
    setPriority(todo.priority);
    setProjectName(todo.projectName);
  }, [
    todo.title,
    todo.memo,
    todo.toDoDate,
    todo.subTask,
    todo.priority,
    todo.projectName,
  ]);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const onChangeSubTask = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const subTaskAll = subTask.slice();
    subTaskAll[index] = e.target.value;
    setSubTask(subTaskAll);
  };

  const onChangePriority = (prioriry: Priority) => {
    setPriority(prioriry);
  };

  const onChangeProjectName = (project: string) => {
    setProjectName(project);
  };

  const resetTask = () => {
    setTitle("");
    setMemo("");
    setTodoDate(today);
    setSubTask([]);
    setPriority("medium");
    setProjectName("未分類");
    dispatch(resetTaskModal());
  };

  const onClickSubTaskAdd = () => {
    const subTaskAll = subTask.slice();
    if (subTaskAll.length === 20) {
      window.confirm("サブタスクは20個までです！");
      return;
    }
    subTaskAll.push("");
    setSubTask(subTaskAll);
  };

  const onClickAdd = () => {
    const toDoList: ToDo = {
      title,
      memo,
      subTask: subTask.filter((v) => v !== ""),
      toDoDate,
      priority,
      projectName,
    };
    addTodo(toDoList);
    resetTask();
  };

  const onClickEdit = () => {
    const toDoList: ToDo = {
      title,
      memo,
      subTask: subTask.filter((v) => v !== ""),
      toDoDate,
      priority,
      projectName,
    };
    editTodo(toDoList, editTaskId);
    resetTask();
  };

  const onClickDelete = () => {
    deleteTodo(editColumnId, editTaskId);
    resetTask();
  };

  return {
    title,
    memo,
    subTask,
    toDoDate,
    priority,
    projectName,
    resetTask,
    onChangeTitle,
    onChangeMemo,
    onChangeSubTask,
    onChangePriority,
    onChangeProjectName,
    onClickSubTaskAdd,
    setTodoDate,
    onClickAdd,
    onClickEdit,
    onClickDelete,
  };
};

export type UseTaskModalReturn = ReturnType<typeof useTaskModal>;
