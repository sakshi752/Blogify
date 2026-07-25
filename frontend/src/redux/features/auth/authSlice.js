import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token:null,
    isAuthenticated:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login(state,action){
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.isAuthenticated
        },
        logout(action,payload){
            state.user = null;
            state.isAuthenticated = null;
            state.token = false;
        }
    }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;