import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemsFromCart,
  fetchCartItemsByUserId,
  resetCart,
  updateItems,
} from "./cartApi";

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

export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchCartItemsByUserId",
  async (userId) => {
    const response = await fetchCartItemsByUserId(userId);

    return response.data;
  }
);

export const updateItemsAsync = createAsyncThunk(
  "cart/updateItems",
  async (update) => {
    const response = await updateItems(update);

    return response.data;
  }
);

export const deleteItemsFromCartAsync = createAsyncThunk(
  "cart/deleteItemsFromCart",
  async (itemId) => {
    const response = await deleteItemsFromCart(itemId);

    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
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
      })
      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateItemsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItemsAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemsFromCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItemsFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
