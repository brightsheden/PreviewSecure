import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';



export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {

    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        

        const { data } = await axios.post(
            ' http://127.0.0.1:8000//api/auth/login/',
            { 'email': email, 'password': password },
            config
        );



     
        
        localStorage.setItem('userInfo', JSON.stringify(data));
      
    
        return data;

        

    } catch (error) {
        return rejectWithValue(error.response.data.detail);
    }
});

export const register = createAsyncThunk('auth/register', async ({ email, password ,number}, { rejectWithValue }) => {
console.log(selectedCountry)
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
              
            }
        }
        

        const { data } = await axios.post(
            ' http://127.0.0.1:8000//api/auth/register/',
            { "email":email, "username":username, "number":number, "password":password},
            config
        );



     
        
        //localStorage.setItem('userInfo', JSON.stringify(data));
        //localforage.setItem('userInfo', JSON.stringify(data))
        
    
        return data;

        

    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

