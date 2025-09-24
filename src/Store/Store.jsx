// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./slices/langSlice";
import themeReducer from "./slices/themeSlice";
import layoutReducer from "./slices/layout-slice";
const Store = configureStore({
  reducer: {
    lang: langReducer,
    themeSlice: themeReducer,
    layout: layoutReducer,
  },
});

export default Store;
