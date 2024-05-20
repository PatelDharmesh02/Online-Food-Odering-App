import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload?.price;
    },
    removeItem: (state, action) => {
      let updatedItems = state.items.filter((item) => item?.id !== action.payload);
      state.items = [...updatedItems];
      let updatedPrice = 0;
      state.items.forEach((item) => updatedPrice += item?.price * item.count)
      state.totalPrice = updatedPrice;
    },
    clearCart: (state) => {
      state.items = [];
    },
    manageItemCount: (state, action) => {
      state.items.filter(item => item.id === action.payload?.id).forEach(item => item.count = action.payload?.count);
      let updatedPrice = 0;
      state.items.forEach((item) => updatedPrice += (item?.price * item?.count))
      state.totalPrice = updatedPrice;
    },
  },
});

export const { addItem, removeItem, clearCart, manageItemCount } = cartSlice.actions;

export default cartSlice.reducer;
