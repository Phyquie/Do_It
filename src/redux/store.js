import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import isDarkModeReducer from "./darkSlice";
import viewReducer from "./viewSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    isDarkMode: isDarkModeReducer,
    view: viewReducer,
  },
});

export { store };
