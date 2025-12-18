import api from "./api";
import { refreshToken, logoutUser } from "../features/auth/authSlice";

//Configure les interceptors pour Axios :

export const setupInterceptors = (store) => {
    // Interceptor pour les requêtes 
    api.interceptors.request.use(
        (config) => {
            const token = store.getState().auth.accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    //Interceptor pour les réponses
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            const { auth } = store.getState();

            //Si pas connecté
            if (!auth.isAuthenticated) {
                return Promise.reject(error);
            }

            //si refresh échoue
            if (originalRequest._retry) {
                return Promise.reject(error);
            }

            //Token expiré 
            if (error.response?.status === 401) {
                originalRequest._retry = true;

                try {
                    await store.dispatch(refreshToken()).unwrap();
                    return api(originalRequest);
                } catch (err) {

                    store.dispatch(logoutUser());
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );
};

export default setupInterceptors;
