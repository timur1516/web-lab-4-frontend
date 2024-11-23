import Graph from "./Graph/Graph";
import HistoryTable from "./HistoryTable/HistoryTable";
import LogOutButton from "./LogOutButton/LogOutButton";
import styles from "./MainPage.module.css";
import PointDataForm from "./PointDataForm/PointDataForm";
import {useEffect, useState} from "react";
import axiosUtil from "../util/AxiosUtil.jsx";

function MainPage() {

    const [radius, setRadius] = useState(1);
    const [history, setHistory] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    //TODO: add server error handling
    async function loadPoints() {
        const response = await axiosUtil.get("main/get-points");
        setHistory(response.data);
    }

    useEffect(() => {
        loadPoints().then(() => {
            setIsDataLoaded(true);
        });
    }, []);

    //TODO: add server error handling
    async function checkPoint(x, y, r) {
        const response = await axiosUtil.post("main/check-point", {x: x, y: y, r: r});
        setHistory((h) => [response.data, ...h]);
        return response.data.hit;
    }

    function handleRadiusChange(event) {
        setRadius(Number(event.target.value));
    }

    if(!isDataLoaded) return (<></>);

    return (
        <>
            <LogOutButton/>
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
