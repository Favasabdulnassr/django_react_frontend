import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user';
import loginReducer from './features/Loginslice'


export const store = configureStore({
    reducer:{
        user:userReducer,
        login:loginReducer
        
    },
})