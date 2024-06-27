import { createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "./LoginAction";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";'jwt-decode'

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
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
              state.user = jwtDecode(accessToken);  // Decode the JWT token
              state.is_Authenticated = true;
            }
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
            try {
                console.log('parseeeeeeeeeeeee')
                state.user = jwtDecode(JSON.parse(Cookies.get("accessToken")));
                console.log(state.user)
              } catch (e) {
                console.log('perseeeeeeeeeeee')
                console.log(e,'eeeeeeeeeeeeeeeeeeeeeee');
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
}  = userLoginSlice.actions

export default userLoginSlice.reducer;







