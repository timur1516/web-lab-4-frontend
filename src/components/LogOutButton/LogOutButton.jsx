import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {setIsDataLoaded} from "../../redux/HistorySlice.js";
import {setRadius} from "../../redux/RadiusSlice.js";
import {dropTheme} from "../../util/ThemeUtil.js";
import axios from "axios";

function LogOutButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleLogOut() {
        try {
            await axios.post("auth/logout", {"token": Cookies.get("refreshToken")});
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            dispatch(setIsDataLoaded(false));
            dispatch(setRadius(1));
            dropTheme();
            navigate("/sign-in");
        } catch (error) {
            navigate("/error");
        }
    }

    return (
        <button className={"button"} onClick={handleLogOut}>
            <span className="lg-view">Выйти из аккаунта</span>
            <span className="sm-view">↩</span>
        </button>
    );
}

export default LogOutButton;
