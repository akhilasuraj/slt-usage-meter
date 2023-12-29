import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const globalSpinnerSlice = createSlice({
  name: "globalSpinner",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = globalSpinnerSlice.actions;
export default globalSpinnerSlice.reducer;
