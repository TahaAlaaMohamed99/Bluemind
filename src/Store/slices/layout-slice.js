import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  breadcrumb: false,
};

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState,
  reducers: {
    setBreadcrumb: (state, action) => {
      state.breadcrumb = action.payload;
    },
    addBreadcrumbItem: (state, action) => {
      state.breadcrumb.push(action.payload);
    },
    resetBreadcrumb: (state) => {
      state.breadcrumb = false;
    },
    removeBreadcrumbItem: (state, action) => {
      state.breadcrumb = state.breadcrumb.slice(0, action.payload);
    },
  },
});

export const {
  setBreadcrumb,
  addBreadcrumbItem,
  resetBreadcrumb,
  removeBreadcrumbItem,
} = layoutSlice.actions;

export default layoutSlice.reducer;
