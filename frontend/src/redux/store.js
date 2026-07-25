import { configureStore } from "@reduxjs/toolkit";
import commanReducer from "./commanReducer";

export const store = configureStore({
    reducer: commanReducer
})