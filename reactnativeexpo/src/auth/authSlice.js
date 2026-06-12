import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  forgotEmail: "",
  otpVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },

    forgot: (state, action) => {
      state.forgotEmail = action.payload;
    },

    otp: (state) => {
      state.otpVerified = true;
    },
     resetAuthFlow: (state) => {
      state.forgotEmail = "";
      state.otpVerified = false;
    },
  },
});

export const { login, logout, forgot, otp, resetAuthFlow } = authSlice.actions;

export default authSlice.reducer;