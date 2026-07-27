import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"

const combinedReducer = combineReducers({
    auth: authReducer
}
)
export default combinedReducer;