import Graph from "./Graph/Graph";
import HistoryTable from "./HistoryTable/HistoryTable";
import LogOutButton from "./LogOutButton/LogOutButton";
import styles from "./MainPage.module.css";
import PointDataForm from "./PointDataForm/PointDataForm";
import {useEffect, useState} from "react";
import axiosUtil from "../util/AxiosUtil.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import {useNavigate} from "react-router-dom";

function MainPage() {
    const [radius, setRadius] = useState(1);
    const [history, setHistory] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    
    function loadPoints() {
        axiosUtil
            .get("main/get-points")
            .then((response) => {
                setHistory(response.data);
                setIsDataLoaded(true);
            });
    }

    useEffect(loadPoints, []);

    async function checkPoint(x, y, r) {
        return axiosUtil
            .post("main/check-point", { x, y, r })
            .then((response) => {
                setHistory((h) => [response.data, ...h]);
                return response.data.hit;
            });
    }

    function handleRadiusChange(event) {
        setRadius(Number(event.target.value));
    }

    if (!isDataLoaded) return (<></>);

    return (
        <>
            <LogOutButton/>
            <ErrorMessage error={errorMsg}/>
            <div className={styles["graph-form-container"]}>
                <PointDataForm
                    radius={radius}
                    radiusChangeHandler={handleRadiusChange}
                    pointChecker={checkPoint}
                />
                <Graph
                    radius={radius}
                    pointChecker={checkPoint}
                    history={history}
                />
            </div>
            <div className={styles["history-table-container"]}>
                <HistoryTable
                    history={history}
                />
            </div>
        </>
    );
}

export default MainPage;
