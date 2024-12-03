import styles from "./LogOutButton.module.css"
import {useNavigate} from "react-router-dom";
import axiosUtil from "../../util/AxiosUtil.js";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {setIsDataLoaded} from "../../redux/HistorySlice.js";

function LogOutButton() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleLogOut() {
        await axiosUtil.post("auth/logout");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        dispatch(setIsDataLoaded(false));
        navigate("/sign-in");
    }

    return (
        <button className={`${styles.button} button`} onClick={handleLogOut}>
            Выйти из аккаунта
        </button>
    );
}

export default LogOutButton;
