// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import langReducer from './slices/langSlice';
import themeReducer from './slices/themeSlice';

const Store = configureStore({
  reducer: {
    lang: langReducer,
    themeSlice: themeReducer,
  },
});

export default Store;
