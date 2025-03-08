import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
  name: "isDarkMode",
  initialState: {
    isDarkMode: localStorage.getItem('isDarkMode') === 'true',
  },

  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = darkSlice.actions;
export default darkSlice.reducer;