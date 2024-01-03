import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddress, fetchAddressByUserId } from "./addressApi";

const initialState = {
  addressess: [],
  loading: false,
  error: false,
};

export const addAddressAsync = createAsyncThunk(
  "address/addAddress",
  async (address) => {
    const response = await addAddress(address);
    return await response.data;
  }
);

export const fetchAddressByUserIdAsync = createAsyncThunk(
  "address/fetchAddressByUserId",
  async (userId) => {
    const response = await fetchAddressByUserId(userId);
    return response.data;
  }
);

export const addressSlice = createSlice({
  name: "addressess",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressByUserIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddressByUserIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.addressess = action.payload;
      })
      .addCase(fetchAddressByUserIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.addressess = action.payload;
      })
      .addCase(addAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAddress = (state) => state.addressess.addressess;
export const selectLoading = (state) => state.loading;

export default addressSlice.reducer;
