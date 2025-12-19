import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, refreshTokenAPI, logoutAPI } from "./authAPI";

// Login utilisateur
export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            return await loginAPI(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

// Rafraîchissement du token
export const refreshToken = createAsyncThunk(
    "auth/refresh-token",
    async (_, thunkAPI) => {
        try {
            return await refreshTokenAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Refresh échoué" }
            );
        }
    }
);

// Déconnexion utilisateur
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await logoutAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Erreur de connexion";
            })

            .addCase(refreshToken.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
                state.isInitialized = true;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.isInitialized = true;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
            });
    },
});

export default authSlice.reducer;
