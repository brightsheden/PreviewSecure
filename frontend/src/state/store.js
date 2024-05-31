import { configureStore } from "@reduxjs/toolkit";
import { loginReducer,  registerReducer } from "./Slices/AuthSlice";





const store = configureStore({
    reducer:{
        user:loginReducer,
        register: registerReducer

    }
})

export default store