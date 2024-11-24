import styles from "./LogOutButton.module.css"
import {useNavigate} from "react-router-dom";
import axiosUtil from "../../util/AxiosUtil.jsx";
import Cookies from "js-cookie";

function LogOutButton() {

    const navigate = useNavigate();

    async function handleLogOut() {
        await axiosUtil.post("auth/logout");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        navigate("/sign-in");
    }

    return (
        <button className={`${styles.button} button`} onClick={handleLogOut}>
            Выйти из аккаунта
        </button>
    );
}

export default LogOutButton;
