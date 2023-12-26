import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./cartApi";

const initialState = {
  items: [],
  loading: false,
  error: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);

    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      });
  },
});

export const selectItems = (state) => state.items;

export default cartSlice.reducer;
