import { configureStore } from "@reduxjs/toolkit";
import editReducer from "./feature/editSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      editor: editReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
