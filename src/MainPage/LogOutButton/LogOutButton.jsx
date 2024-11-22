import styles from "./LogOutButton.module.css"
import { useNavigate } from 'react-router-dom';

function LogOutButton(){

    const navigate = useNavigate();

    async function handleLogOut(){
        const token = localStorage.getItem('token');
        await fetch(
            "http://localhost:8080/web4_backend-1.0-SNAPSHOT/api/auth/logout", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST"
            }
        );
        localStorage.removeItem('token');
        navigate("/sign-in");
    }

    return(
        <button className={styles["logout-button"]} onClick={handleLogOut}>
            Выйти из аккаунта
        </button>
    );
}

export default LogOutButton;
