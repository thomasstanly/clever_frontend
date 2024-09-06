import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth/Auth";

export const store = configureStore({
    reducer:{
        auth_user:Auth
    }
})  