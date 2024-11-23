import axios from "axios";
import {StatusCodes} from "http-status-codes";

axios.defaults.baseURL = 'http://localhost:8080/web4_backend-1.0-SNAPSHOT/api';

const axiosUtil = axios.create();

async function refreshAccessToken() {
    const response = await axios.post('/auth/refresh-token', {
        "token": localStorage.getItem("refreshToken")
    });
    const newAccessToken = response.data.token;
    localStorage.setItem('accessToken', newAccessToken);
}

axiosUtil.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosUtil.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === StatusCodes.UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosUtil(originalRequest);
            } catch (refreshError) {
                window.location.href = "/sign-in";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosUtil;
