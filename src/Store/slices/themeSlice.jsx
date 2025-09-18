// src/store/slices/themeSlice.jsx
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  theme: "light",
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      const newTheme = action.payload;
      state.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.remove(newTheme === "dark" ? "light" : "dark");
      document.documentElement.classList.add(newTheme);
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
