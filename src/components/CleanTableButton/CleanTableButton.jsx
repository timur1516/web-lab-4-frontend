import styles from "./CleanTableButton.module.css"
import axiosUtil from "../../util/AxiosUtil.js";

function CleanTableButton() {
    async function handleTableClean() {
        await axiosUtil.post("main/remove-points");
    }

    return (
        <button className={`${styles.button} button`} onClick={handleTableClean}>
            Очистить таблицу
        </button>
    );
}

export default CleanTableButton;
