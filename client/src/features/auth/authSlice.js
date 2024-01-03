import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { updateLoggedInUser } from "../user/userApi";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

// export const updateLoggedInUserAsync = createAsyncThunk(
//   "user/updateLoggedInUser",
//   async (update) => {
//     const response = await updateLoggedInUser(update);
//     return response.data;
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    signOutUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(updateLoggedInUserAsync.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(updateLoggedInUserAsync.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.currentUser = action.payload;
  //     });
  // },
});

export const {
  signInStart,
  signInSuccess,
  signInFail,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFail,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
} = authSlice.actions;

export const selectUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
