import { createSlice } from '@reduxjs/toolkit';
import { fetchImage,DeletImage,UploadImage } from './Image';

const initialState = {
    userImage: null,
    loading: false,
    error: null,
  };



const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchImage.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchImage.fulfilled, (state, action) => {
          state.loading = false;
          state.userImage = action.payload;
        })
        .addCase(fetchImage.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(UploadImage.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(UploadImage.fulfilled, (state, action) => {
          state.loading = false;
          state.userImage = action.payload;
        })
        .addCase(UploadImage.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(DeletImage.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(DeletImage.fulfilled, (state, action) => {
          state.loading = false;
          state.userImage = null; // or update as needed
        })
        .addCase(DeletImage.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { clearError } = imageSlice.actions;
  
  export default imageSlice.reducer;