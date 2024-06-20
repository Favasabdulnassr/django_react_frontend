import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from './base_url';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'




export const fetchUserProfile = createAsyncThunk(
    'user/UserProfile',
    async(data,{rejectWithValue}) => {
        try {
            const accessToken = JSON.parse(Cookies.get('accessToken'));
            console.log('AccessToken',accessToken)

            const response = await axios.get(`${base_url}api/users/dataManage/`,{
                headers:{
                    Accept:'application/json',
                    'content-Type':'application/json',
                    Authorization:`Bearer ${accessToken}`
                },

            });
            console.log(response);
            return response.data;

        }catch(error) {
            if (error.response){
                console.log(error,'aaaaaaaaaaaaaaaaaaa')
                return rejectWithValue(error.response?.data ?? error.message);

            }else{
                console.log(error)
            }
           
        }
    }
);







export const updateUserProfile = createAsyncThunk(
    'user/UpdateProfile',
    async(data,{rejectWithValue}) => {
        try {
            const accessToken = JSON.parse(Cookies.get('accessToken'));
            console.log('AccessToken',accessToken)

            const response = await axios.put(`${base_url}api/users/dataManage/`,data,{
                headers:{
                    Accept:'application/json',
                    'content-Type':'application/json',
                    Authorization:`Bearer ${accessToken}`
                },

            });
            console.log(response);
            return response.data;

        }catch(error) {
            if (error.response){
                console.log(error,'aaaaaaaaaaaaaaaaaaa')
                return rejectWithValue(error.response?.data ?? error.message);

            }else{
                console.log(error)
            }
           
        }
    }
);

const userProfileSlice = createSlice({
    name:'userProfile',
    initialState:{
        user: null,
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers :(builder) => {
        builder
        .addCase(fetchUserProfile.pending,(state) => {
            state.loading = true;
            state.error = null;

        })
        .addCase(fetchUserProfile.fulfilled,(state,action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(fetchUserProfile.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateUserProfile.pending,(state) => {
            state.loading = true;
            state.error = null;

        })
        .addCase(updateUserProfile.fulfilled,(state,action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(updateUserProfile.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default userProfileSlice.reducer;
