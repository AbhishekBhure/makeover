import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderApi";

const initialState = {
  orders: [],
  loading: false,
  error: false,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);

    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        (state.loading = false), state.orders.push(action.payload);
      });
  },
});

export default orderSlice.reducer;
