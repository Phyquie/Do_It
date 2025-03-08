import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    isListView: true, // true for list view, false for grid view
  },
  reducers: {
    toggleView: (state) => {
      state.isListView = !state.isListView;
    },
  },
});

export const { toggleView } = viewSlice.actions;
export default viewSlice.reducer; 