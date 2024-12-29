import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    loader: true,
  },
  reducers: {
    setLoaderState: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { setLoaderState } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
