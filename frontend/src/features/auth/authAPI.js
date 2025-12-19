import api from "../../services/api";

// requêtes HTTP vers le backend pour l'authentification.

// Login
export const loginAPI = async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

// Refresh token
export const refreshTokenAPI = async () => {
    const res = await api.post("/auth/refresh-token");
    return res.data;
};

// Logout
export const logoutAPI = async () => {
    await api.post("/auth/logout");
};
