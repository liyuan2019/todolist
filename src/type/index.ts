export type Priority =
  | "highest"
  | "high"
  | "medium"
  | "low"
  | "lowest"
  | "none";
// export type Priority = "最高" | "高" | "中" | "低" | "最低" | "未設定";

export type ToDo = {
  title: string;
  memo: string;
  subTask: string[];
  toDoDate: string;
  priority: Priority;
  // priority: "最高" | "高" | "中" | "低" | "最低" | "未設定";
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
  count: number;
  columns: { [key: string]: ToDoColumn };
  columnOrder: string[];
};
