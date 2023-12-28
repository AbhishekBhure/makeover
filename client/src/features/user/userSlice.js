import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders } from "./userApi";

const initialState = {
  userOrders: [],
  loading: false,
  error: false,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.userInfo.userOrders;

export default userSlice.reducer;
