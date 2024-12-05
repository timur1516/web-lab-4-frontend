import {useNavigate} from "react-router-dom";
import axiosUtil from "../../util/AxiosUtil.js";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {setIsDataLoaded} from "../../redux/HistorySlice.js";
import {setRadius} from "../../redux/RadiusSlice.js";
import {dropTheme} from "../../util/ThemeUtil.js";
import styles from "../HistoryTable/HistoryTable.module.css";

function LogOutButton() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleLogOut() {
        await axiosUtil.post("auth/logout");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        dispatch(setIsDataLoaded(false));
        dispatch(setRadius(1));
        dropTheme();
        navigate("/sign-in");
    }

    return (
        <button className={"button"} onClick={handleLogOut}>
            <span className="lg-view">Выйти из аккаунта</span>
            <span className="sm-view">↩</span>
        </button>
    );
}

export default LogOutButton;
