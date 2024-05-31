import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../Actions/AuthActions";

const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null







export const loginSlice = createSlice({
  name: "user",
  initialState : {
    userInfo:  userInfoFromStorage,
  
    isRequest: false,
    isSuccess: false,
    errorMessage: "",
  },
  
  reducers: {
    resetUserState: (state) => {
      state.isRequest = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.data = null;
      state.userInfo = null
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userProfile');
    },
  },

  
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.userInfo = state.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      

  },
});

export const registerSlice = createSlice({
  name: "register",
  initialState:{
    //userInfo:  userInfoFromStorage,
    isRequest: false,
    isSuccess: false,
    errorMessage: "",

  },
  reducers: {
    resetUserRegisterstate: (state) => {
      state.isRequest = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.data = null;
      //state.userInfo = null
      //localStorage.removeItem('userInfo');
      //localStorage.removeItem('userProfile');

 
    },
  },

  
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.data = action.payload;
        //state.userInfo = state.data
      })
      .addCase(register.rejected, (state, action) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.data=[];
        //state.userInfo=data

        state.errorMessage = action.payload;
      })
      

  },
});



export const loginReducer = loginSlice.reducer;
export const registerReducer = registerSlice.reducer
export const {resetUserState} = loginSlice.actions
export const {resetUserRegisterstate} = registerSlice.actions