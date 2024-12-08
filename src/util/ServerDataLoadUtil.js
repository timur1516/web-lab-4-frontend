import axiosUtil from "./AxiosUtil.js";
import {setHistory, setIsDataLoaded} from "../redux/HistorySlice.js";
import {setAvatar, setFirstName, setLastName, setUsername} from "../redux/UserSlice.js";

export async function loadPoints(dispatch) {
    const response = await axiosUtil.get("main/get-points");
    dispatch(setHistory(response.data));
    dispatch(setIsDataLoaded(true));

}

export async function loadUserData(dispatch) {
    const response = await axiosUtil.get("main/get-user-profile-data");
    console.log(response);
    if(response.data.avatar == null) return true;
    dispatch(setUsername(response.data.username));
    dispatch(setFirstName(response.data.firstName));
    dispatch(setLastName(response.data.lastName));
    dispatch(setAvatar(`data:image/${response.data.avatar.type};base64,${response.data.avatar.base64}`));
}
