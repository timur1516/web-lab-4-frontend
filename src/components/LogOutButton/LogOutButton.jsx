import styles from "./LogOutButton.module.css"
import {useNavigate} from 'react-router-dom';
import axiosUtil from "../../util/AxiosUtil.jsx";

function LogOutButton() {

    const navigate = useNavigate();

    async function handleLogOut() {
        await axiosUtil.post("auth/logout");
        navigate("/sign-in");
    }

    return (
        <button className={`${styles.button} button`} onClick={handleLogOut}>
            Выйти из аккаунта
        </button>
    );
}

export default LogOutButton;
