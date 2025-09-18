// src/store/langSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem("lang") || "en";

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLanguage: (_, action) => {
      const newLang = action.payload;
      localStorage.setItem("lang", newLang);
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLang;
      return newLang;
    },
  },
});

export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;
