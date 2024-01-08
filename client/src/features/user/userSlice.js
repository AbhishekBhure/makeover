import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders, fetchLoggedInUserInfo } from "./userApi";

const initialState = {
  userOrders: [],
  totalOrders: 0,
  userInfo: null, //this will have more info about the user
  loading: false,
  error: false,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async ({ userId, pagination }) => {
    const response = await fetchLoggedInUserOrders(userId, pagination);
    return response.data;
  }
);

export const fetchLoggedInUserInfoAsync = createAsyncThunk(
  "user/fetchLoggedInUserInfo",
  async (userId) => {
    const response = await fetchLoggedInUserInfo(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
        // state.totalOrders = action.payload;
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLoggedInUserInfoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUserInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      });
  },
});

//TODO: change orders and address to be independent of user
export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrderLoading = (state) => state.user.loading;
export const selectTotalUserOrders = (state) => state.user.totalOrders;

export default userSlice.reducer;
