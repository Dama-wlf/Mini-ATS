// Configuration du store Redux 

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import candidateReducer from "../features/candidate/candidateSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        candidates: candidateReducer
    },
});

export default store;
