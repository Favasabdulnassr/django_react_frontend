import { createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "./LoginAction";
import Cookies from 'js-cookie';

const initialState = {
    loader:false,
    is_Authenticated:false,
    error: {},
    user: {} ,
    success:false,
};

const userLoginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        resetLoginError:(state) =>{
            state.error = {};
        },
        userLogined:(state) => {
            state.is_Authenticated = true
        },
        userLogout:(state) =>{
            Cookies.remove("accessToken");
            Cookies.remove("detail");
            localStorage.removeItem("accessToken")
            state.is_Authenticated = false;
            state.success = false;
        },
        dataFetch:(state) => {
            try {
                console.log('user')
                state.user = JSON.parse(Cookies.get('accessToken'));
            }catch(e){
                console.log(e)
                state.user = {};
            }
        }
        
    },
    extraReducers : (builder) => {
        builder
        .addCase(LoginUser.pending,(state) => {
            state.loader = true;
            state.is_Authenticated = false;
        })
        .addCase(LoginUser.fulfilled,(state) =>{
            state.loader = false;
            state.success = true;
            state.is_Authenticated = true;
            state.user = JSON.parse(Cookies.get('accessToken'));
            
        })
        .addCase(LoginUser.rejected,(state,action) => {
            state.loader = false;
            state.is_Authenticated = false;
            state.error = action.payload
            state.success = false;
        })
    },
    
    
});


export const {
     resetLoginError,
     userLogined,
     userLogout,
     dataFetch,
}  = userLoginSlice.actions

export default userLoginSlice.reducer;







