import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    authDrawerState: false,
    selectedAddress: {},
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
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const { setUser, logoutUser, toggleAuthDrawer, setSelectedAddress } =
  userSlice.actions;
export default userSlice.reducer;
