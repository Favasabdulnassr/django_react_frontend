import {createSlice} from '@reduxjs/toolkit';
import {registerUser} from './action'


const initialState = {
    loading:false,
    registered:false,
    error:{},
    success:false,
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        resetError: (state) => {
            state.error = {};
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(registerUser.pending,(state) =>{
            state.loading = true;
        })
        .addCase(registerUser.fulfilled,(state) =>{
            state.loading = false;
            state.registered = true;
        })
        .addCase(registerUser.rejected,(state,action) =>{
            state.loading = false;
            state.registered = false;
            console.log(action.payload,'ppppppppppppppppppppppppppppppp')
            state.error = action.payload;
            console.log(state.error)
        });
    },

})

export const {resetError} = userSlice.actions;
export default userSlice.reducer
