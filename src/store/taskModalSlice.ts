import { ToDo } from "../type";
import { createSlice } from "@reduxjs/toolkit";

type TaskModal = {
  todo: ToDo;
  taskModalOpen: boolean;
  editFlag: boolean;
  editTaskId: string;
  editColumnId: string;
};

const initialState: TaskModal = {
  todo: {
    title: "",
    memo: "",
    subTask: [],
    toDoDate: new Date().toLocaleDateString(),
    priority: "medium",
    projectName: "未分類",
  },
  taskModalOpen: false,
  editFlag: false,
  editTaskId: "",
  editColumnId: "",
};

export const taskModalSlice = createSlice({
  name: "taskmodal",
  initialState,
  reducers: {
    resetTaskModal: () => {
      return initialState;
    },
    setTaskModalOpen: (state) => {
      return {
        ...initialState,
        taskModalOpen: true,
      };
    },
    setTaskModal: (_, action) => {
      const { todo, columnId, taskId } = action.payload;
      return {
        todo,
        taskModalOpen: true,
        editFlag: true,
        editColumnId: columnId,
        editTaskId: taskId,
      };
    },
  },
});

// action
export const { resetTaskModal, setTaskModalOpen, setTaskModal } =
  taskModalSlice.actions;

// reducer
export default taskModalSlice.reducer;
