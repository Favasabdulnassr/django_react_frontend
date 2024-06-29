import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { base_url } from './base_url';

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, thunkAPI) => {
    const token = Cookies.get('accessToken');
    
    if (!token) {
        return thunkAPI.rejectWithValue('No access token available');
    }

    try {
        const response = await axios.get(`${base_url}/api/users/users/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
});



export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({ userId, userData }, thunkAPI) => {
      const token = Cookies.get('accessToken');
      console.log('useruseruser  :' , userId, userData)
      
      if (!token) {
        return thunkAPI.rejectWithValue('No access token available');
      }
  
      try {
        const response = await axios.put(`${base_url}/api/users/users/${userId}/`, userData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );
  

  
  export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async ({ userId }, thunkAPI) => {
        console.log('apithunk', userId)
      const token = Cookies.get('accessToken');
      console.log('useruseruser  :' , userId)
      
      if (!token) {
        return thunkAPI.rejectWithValue('No access token available');
      }
      console.log(token)
  
      try {
        const response = await axios.delete(`${base_url}/api/users/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return { userId, message: response.data };
    } catch (error) {
        if(error.response){
            console.error(error.response)
            return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');

        }else{
            console.log(error)
        }
      }
    }
  );
  

  



const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(updateUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = state.users.map(user => 
                user.id === action.payload.id ? action.payload : user
            );
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(deleteUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = state.users.filter(user=> user.id !== action.payload);
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
      
      
    }
});

export default adminSlice.reducer