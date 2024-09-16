import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import restaurantsSlice from "./restaurantsSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        restaurants: restaurantsSlice,
        user: userSlice
    }
});

export default store;