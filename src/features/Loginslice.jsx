import { createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "./LoginAction";
import Cookies from 'js-cookie';

const initialState = {
    loader:false,
    is_Authenticated:false,
    error:{},
    user:{},
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
            state.is_Authenticated = false;
            state.success = false;
        },
        datFetch:(state) => {
            try {
                state.user = JSON.parse(Cookies.get('accessToken'));
            }catch(e){
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
        .addCase(LoginUser.fulfilled,(state,action) =>{
            state.loader = false;
            state.success = true;
            state.is_Authenticated = true;
            try{
                state.user = JSON.parse(Cookies.get('accessToken'));
            }catch(e) {
                console.log(e);
            }
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
}  = userLoginSlice.reducer

export default userLoginSlice.reducer;