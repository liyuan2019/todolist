import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../type";

type ProjectModal = {
  project: Project;
  projectModalOpen: boolean;
  editFlag: boolean;
  editName: string;
};

const initialState: ProjectModal = {
  project: {
    name: "",
    introduction: "",
    color: "#f44336",
  },
  projectModalOpen: false,
  editFlag: false,
  editName: "",
};

export const projectModalSlice = createSlice({
  name: "projectmodal",
  initialState,
  reducers: {
    resetProjectModal: () => {
      return initialState;
    },
    setProjectModalOpen: () => {
      return {
        ...initialState,
        projectModalOpen: true,
      };
    },
    setProjectModal: (_, action) => {
      const project = action.payload;
      return {
        project,
        projectModalOpen: true,
        editFlag: true,
        editName: project.name,
      };
    },
  },
});

// action
export const { resetProjectModal, setProjectModalOpen, setProjectModal } =
  projectModalSlice.actions;

// reducer
export default projectModalSlice.reducer;
