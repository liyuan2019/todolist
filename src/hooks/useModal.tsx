import { Board, ToDo, Priority } from "../type";
import { ChangeEvent, useEffect, useState } from "react";
import { useToDoList } from "./useToDoList";

export const useModal = (
  state: Board,
  setState: React.Dispatch<React.SetStateAction<Board>>
) => {
  const today = new Date().toLocaleDateString();
  const [modalOpen, setModalOpen] = useState(false);
  const { addTodo, editTodo, deleteTodo } = useToDoList(state, setState);
  const [todo, setTodo] = useState<ToDo>({
    title: "",
    memo: "",
    subTask: [],
    toDoDate: today,
    priority: "medium",
    projectName: "未分類",
  });

  const [title, setTitle] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [toDoDate, setTodoDate] = useState<string>(today);
  const [subTask, setSubTask] = useState<string[]>([]);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<string>("");
  const [editColumnId, setEditColumnId] = useState<string>("");
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

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    reset();
    setModalOpen(false);
  }

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

  const onChangePriority = (
    // e: MouseEvent<HTMLElement, MouseEvent>,
    prioriry: Priority
  ) => {
    setPriority(prioriry);
  };

  const onChangeProjectName = (project: string) => {
    setProjectName(project);
  };

  const reset = () => {
    setTitle("");
    setMemo("");
    setTodoDate(today);
    setSubTask([]);
    setPriority("medium");
    setProjectName("未分類");
    setTodo({
      title: "",
      memo: "",
      subTask: [],
      toDoDate: new Date().toLocaleDateString(),
      priority: "medium",
      projectName: "未分類",
    });
    setEditFlag(false);
    setEditTaskId("");
    setEditColumnId("");
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
    reset();
    closeModal();
  };

  const onClickCancel = () => {
    reset();
    closeModal();
  };

  const onClickTask = (todo: ToDo, columnId: string, taskId: string) => {
    setTodo(todo);
    setEditFlag(true);
    setEditTaskId(taskId);
    setEditColumnId(columnId);
    openModal();
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
    reset();
    closeModal();
  };

  const onClickDelete = () => {
    // e.stopPropagation();
    deleteTodo(editColumnId, editTaskId);
    reset();
    closeModal();
  };

  return {
    modalOpen,
    title,
    memo,
    subTask,
    toDoDate,
    priority,
    projectName,
    editFlag,
    editColumnId,
    openModal,
    closeModal,
    onChangeTitle,
    onChangeMemo,
    onChangeSubTask,
    onChangePriority,
    onChangeProjectName,
    onClickSubTaskAdd,
    setTodoDate,
    onClickTask,
    onClickCancel,
    onClickAdd,
    onClickEdit,
    onClickDelete,
  };
};

export type UseModalReturn = ReturnType<typeof useModal>;
