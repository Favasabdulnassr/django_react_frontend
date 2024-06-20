import {configureStore,} from '@reduxjs/toolkit';
import userReducer from './features/user';
import loginReducer from './features/Loginslice';
import userProfile from './features/userProfileSlice';





export const store = configureStore({
    reducer:
    {
    user:userReducer,
    login:loginReducer,
    userProfile:userProfile,

     },
    


})



