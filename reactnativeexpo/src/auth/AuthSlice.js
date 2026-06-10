// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: null,
// //   isAuthenticated: false,
//   loading: false,
//   error: null,
// status:'loading'
// //   otpVerified: false,
// //   emailForReset: null,
// };

// const authSlice = createSlice({
//   name: "auth",

//   initialState,

//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },

//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//     },

//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//     },

//     setOtpVerified: (state, action) => {
//       state.otpVerified = action.payload;
//     },

//     setEmailForReset: (state, action) => {
//       state.emailForReset = action.payload;
//     },

//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   setLoading,
//   setUser,
//   logout,
//   setOtpVerified,
//   setEmailForReset,
//   setError,
// } = authSlice.actions;

// export default authSlice.reducer;