import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    authDrawerState: false
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    logoutUser: (state) => {
      state.userData = null;
    },
    toggleAuthDrawer: (state, action) => {
      state.authDrawerState = action.payload || !state.authDrawerState;
    }
  },
});

export const { setUser, logoutUser, toggleAuthDrawer } = userSlice.actions;
export default userSlice.reducer;
