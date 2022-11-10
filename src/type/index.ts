export type ToDo = {
  title: string;
  memo: string;
  subTask: string[];
  toDoDate: Date | null;
};

export type ToDoColumn = {
  id: string;
  title: string;
  taskIds: string[];
  status: "todo" | "doing" | "done";
};

export type ToDoTask = {
  id: string;
  content: ToDo;
};

export type Board = {
  tasks: { [key: string]: ToDoTask };
  columns: { [key: string]: ToDoColumn };
  columnOrder: string[];
};
