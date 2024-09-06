import {createSlice} from '@reduxjs/toolkit'


const AuthSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        isAuthenticated:false,
        isAdmin:false
    },
    reducers:{
        set_Authenticate:(state, action) =>{
            state.user=action.payload.first_name
            state.isAuthenticated=action.payload.isAuth
            state.isAdmin=action.payload.isAdmin
        }
    }
})

export const {set_Authenticate} = AuthSlice.actions;
export default AuthSlice.reducer;