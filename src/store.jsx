import {configureStore,} from '@reduxjs/toolkit';
import userReducer from './features/user';
import loginReducer from './features/Loginslice';
import userProfile from './features/userProfileSlice';
import imageReducer from './features/ImageSlice';
import adminUsers from './features/AdminSlice';





export const store = configureStore({
    reducer:
    {
    user:userReducer,
    login:loginReducer,
    userProfile:userProfile,
    image:imageReducer,
    admin:adminUsers,


     },
    


})



