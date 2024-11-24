import axios from "axios";
import {StatusCodes} from "http-status-codes";
import Cookies from "js-cookie";
import saveTokenToCookies from "./TokenUtil.jsx";

axios.defaults.baseURL = "http://localhost:8080/web4_backend-1.0-SNAPSHOT/api";

const axiosUtil = axios.create();

async function refreshAccessToken() {
    const response = await axios.post("/auth/refresh-token", {
        "token": Cookies.get("refreshToken")
    });
    const newAccessToken = response.data.token;
    Cookies.remove("accessToken");
    saveTokenToCookies(newAccessToken, "accessToken");
    return newAccessToken;
}

axiosUtil.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken)
            config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    }, (error) => {
        window.location.href = "/error";
        return Promise.reject(error);
    }
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
                if (refreshError?.status === StatusCodes.UNAUTHORIZED)
                    window.location.href = "/sign-in";
                else
                    window.location.href = "/error";
                return Promise.reject(refreshError);
            }
        }
        window.location.href = "/error";
        return Promise.reject(error);
    }
);

export default axiosUtil;
