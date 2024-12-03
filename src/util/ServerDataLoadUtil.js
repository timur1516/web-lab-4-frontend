import axiosUtil from "./AxiosUtil.js";
import {setHistory, setIsDataLoaded} from "../redux/HistorySlice.js";
import {setAvatar, setUsername} from "../redux/UserSlice.js";

export function loadPoints(dispatch) {
    axiosUtil
        .get("main/get-points")
        .then((response) => {
            dispatch(setHistory(response.data));
            dispatch(setIsDataLoaded(true));
        });
}

export function loadUserData(dispatch) {
    axiosUtil
        .get("main/get-user-profile-data")
        .then((response) => {
            dispatch(setUsername(response.data.username));
            dispatch(setAvatar(`data:image/${response.data.avatarType};base64,${response.data.avatar}`));
        });
}
