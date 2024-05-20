import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState: {
        restaurantsData: [],
        restaurantsDetails: {}
    },
    reducers: {
        updateRestaurantsData: (state, action) => {
            state.restaurantsData = action.payload;
        },
        updateRestaurantsDetails: (state, action) => {
            state.restaurantsDetails = action.payload;
        }
    }
});

export const { updateRestaurantsData, updateRestaurantsDetails } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;