import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type States = {
  projectFilterName: string;
};

const initialState: States = {
  projectFilterName: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setProjectFilterName: (state, action) => {
      return {
        ...state,
        projectFilterName: action.payload,
      };
    },
  },
});

// action
export const { setProjectFilterName } = filterSlice.actions;

// reducer
export default filterSlice.reducer;

export const selectProjectFilterName = (state: RootState) =>
  state.filter.projectFilterName;
