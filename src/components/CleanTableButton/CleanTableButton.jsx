import styles from "./CleanTableButton.module.css"
import axiosUtil from "../../util/AxiosUtil.js";
import {loadPoints} from "../../util/ServerDataLoadUtil.js";
import {useDispatch} from "react-redux";

function CleanTableButton() {
    const dispatch = useDispatch();
    async function handleTableClean() {
        await axiosUtil.post("main/remove-points");
        await loadPoints(dispatch);
    }

    return (
        <button className={`${styles.button} button`} onClick={handleTableClean}>
            Очистить таблицу
        </button>
    );
}

export default CleanTableButton;
