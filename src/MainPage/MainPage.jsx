import Graph from "./Graph/Graph";
import HistoryTable from "./HistoryTable/HistoryTable";
import LogOutButton from "./LogOutButton/LogOutButton";
import styles from "./MainPage.module.css";
import PointDataForm from "./PointDataForm/PointDataForm";
import React, { useState } from "react";

function MainPage() {

    const [radius, setRadius] = useState(1);
    const [history, setHistory] = useState([]);

    function handleRadiusChange(event) {
        setRadius(Number(event.target.value));
    }

    function checkPoint(x, y, r) {
        console.log(`На сервер отправлены данные: x=${x},y=${y}, r=${r}`);

        let response = { x: x, y: y, r: r, hit: true, reqTime: new Date().toLocaleTimeString(), procTime: 12 };
        setHistory((h) => [response, ...h]);

        return true;
    }

    return (
        <>
            <LogOutButton />
            <div className={styles["graph-form-container"]}>
                <PointDataForm
                    radius={radius}
                    radiusChangeHandler={handleRadiusChange}
                    pointChecker={checkPoint}
                />
                <Graph
                    radius={radius}
                    pointChecker={checkPoint}
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
