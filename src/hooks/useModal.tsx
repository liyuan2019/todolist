import { Board, ToDo } from "@/type";
import { ChangeEvent, useEffect, useState } from "react";
import { useToDoList } from "./useToDoList";

export const useModal = (
  state: Board,
  setState: React.Dispatch<React.SetStateAction<Board>>
) => {
  const today = new Date();
  const [modalOpen, setModalOpen] = useState(false);
  const { addTodo, editTodo, deleteTodo } = useToDoList(state, setState);
  const [todo, setTodo] = useState<ToDo>({
    title: "",
    memo: "",
    subTask: [],
    toDoDate: today,
  });

  const [title, setTitle] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [toDoDate, setTodoDate] = useState<Date | null>(today);
  const [subTask, setSubTask] = useState<string[]>([]);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<string>("");
  const [editColumnId, setEditColumnId] = useState<string>("");

  useEffect(() => {
    setTitle(todo.title);
    setMemo(todo.memo);
    setTodoDate(todo.toDoDate);
    setSubTask(todo.subTask);
  }, [todo.title, todo.memo, todo.toDoDate, todo.subTask]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
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

  const reset = () => {
    setTitle("");
    setMemo("");
    setTodoDate(today);
    setSubTask([]);
    setTodo({
      title: "",
      memo: "",
      subTask: [],
      toDoDate: new Date(),
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
    editFlag,
    openModal,
    closeModal,
    onChangeTitle,
    onChangeMemo,
    onChangeSubTask,
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
