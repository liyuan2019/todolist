export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type TaskType = {
  id: string;
  content: string;
};

export type Board = {
  tasks: { [key: string]: TaskType };
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
};
