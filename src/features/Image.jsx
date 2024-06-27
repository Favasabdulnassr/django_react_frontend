import axios from 'axios';
import { base_url } from './base_url';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const fetchImage = createAsyncThunk(
    'image/userImage',
    async(_,thunkAPI) => {
        try {
            const accessToken = JSON.parse(Cookies.get('accessToken'));
            console.log('AccessToken',accessToken)
            
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            const response = await axios.get(`${base_url}api/users/user/profile_picture/`,{
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
                console.log('Error fetching user profile:', error);
                return thunkAPI.rejectWithValue(error.response?.data ?? error.message);

            }else{
                console.log(error)
            }
           
        }
    }
);




export const UploadImage = createAsyncThunk(
    'image/uploadImage',
    async(data,thunkAPI) => {
        try {
            const accessToken = JSON.parse(Cookies.get('accessToken'));
            console.log('AccessToken',accessToken)
            
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            const response = await axios.post(`${base_url}api/users/user/profile_picture/`,data,{
                headers:{
                   
                    Authorization:`Bearer ${accessToken}`
                },

            });
            console.log(response);
            toast.success('Image uploaded successfully')
            return response.data;

        }catch(error) {
            if (error.response){
                console.error('Error fetching user profile:', error);
                return thunkAPI.rejectWithValue(error.response?.data ?? error.message);

            }else{
                console.log(error)
            }
           
        }
    }
);




export const DeletImage = createAsyncThunk(
    'image/deleteImage',
    async(data,thunkAPI) => {
        try {
            const accessToken = JSON.parse(Cookies.get('accessToken'));
            console.log('AccessToken',accessToken)
            
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            const response = await axios.delete(`${base_url}api/users/user/profile_picture/`,data,{
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
                console.error('Error fetching user profile:', error);
                return thunkAPI.rejectWithValue(error.response?.data ?? error.message);

            }else{
                console.log(error)
            }
           
        }
    }
);


