import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAddressByUserId,
} from "./addressApi";

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

export const editAddressAsync = createAsyncThunk(
  "address/editAddress",
  async ({ address, alert }) => {
    const response = await editAddress(address);
    alert("Address Updated Successfully ✅", { variant: "success" });
    return response.data;
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "address/deleteAddress",
  async ({ addressId, alert }) => {
    const response = await deleteAddress(addressId);
    alert("Address Deleted Successfully ✅", { variant: "success" });
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
      })
      .addCase(editAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.addressess = state.addressess.filter(
          (address) => address._id !== action.payload._id
        );
      })
      .addCase(editAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addressess.findIndex(
          (address) => address.id === action.payload.id
        );
        state.addressess.splice(index, 1);
      })
      .addCase(deleteAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAddress = (state) => state.addressess.addressess;
export const selectAddressLoading = (state) => state.addressess.loading;

export default addressSlice.reducer;
