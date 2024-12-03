import styles from "./CleanTableButton.module.css"
import axiosUtil from "../../util/AxiosUtil.jsx";

function CleanTableButton() {
    async function handleLogOut() {
        await axiosUtil.post("main/remove-points");
    }

    return (
        <button className={`${styles.button} button`} onClick={handleLogOut}>
            Очистить таблицу
        </button>
    );
}

export default CleanTableButton;
