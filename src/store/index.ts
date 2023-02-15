import { configureStore } from "@reduxjs/toolkit";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
  useDispatch as rawUseDispatch,
} from "react-redux";
import tasksReducer from "./tasksSlice";
import filterReducer from "./filterSlice";
import taskModalSlice from "./taskModalSlice";
import projectModalSlice from "./projectModalSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filterReducer,
    taskModal: taskModalSlice,
    projectModal: projectModalSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export const useDispatch: () => AppDispatch = rawUseDispatch;
