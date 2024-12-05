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
        <button className={"button"} onClick={handleTableClean}>
            <span className="lg-view">Очистить таблицу</span>
            <span className="sm-view">🗑️</span>
        </button>
    );
}

export default CleanTableButton;
