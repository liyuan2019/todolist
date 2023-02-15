import { initialData } from "../data/initial-data";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
// import { Board } from "../type";
// import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

// const tasksAdapter = createEntityAdapter<Board>()

// const initialState = tasksAdapter.getInitialState(initialData)

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialData,
  reducers: {
    setTasks: (_, action) => {
      return {
        ...action.payload,
      };
    },
    clearState: () => {
      return {
        ...initialData,
      };
    },
  },
  //respond to other actions that weren't defined as part of this slice's reducers field
  extraReducers(builder) {},
});

// action
export const { setTasks, clearState } = tasksSlice.actions;

// reducer
export default tasksSlice.reducer;

export const selectAllTasks = (state: RootState) => state.tasks;
export const selectProjects = (state: RootState) => state.tasks.projects;
export const selectProjectColor = createSelector(
  [selectProjects, (state, projectName) => projectName],
  (projects, projectName) =>
    projects.find(({ name }) => name === projectName)?.color ?? "white"
);
