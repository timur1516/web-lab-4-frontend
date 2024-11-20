import styles from "./LogOutButton.module.css"
import { useNavigate } from 'react-router-dom';

function LogOutButton(){

    const navigate = useNavigate();

    function handleLogOut(){
        sessionStorage.setItem('isLoggedIn', false);
        navigate("/sign-in");
    }

    return(
        <button className={styles["logout-button"]} onClick={handleLogOut}>
            Выйти из аккаунта
        </button>
    );
}

export default LogOutButton;
