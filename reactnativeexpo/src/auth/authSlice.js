import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  email:"",
  isLoggedIn: false,
  forgotEmail: "",
  otpVerified: false,
   registeredUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.email = action.payload
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
      registerUser: (state, action) => {
      state.registeredUser = action.payload;
    },
  },
});

export const { login, logout, forgot, otp, resetAuthFlow, registerUser } = authSlice.actions;

export default authSlice.reducer;