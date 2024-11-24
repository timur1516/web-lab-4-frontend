import Graph from "../components/Graph/Graph.jsx";
import HistoryTable from "../components/HistoryTable/HistoryTable.jsx";
import LogOutButton from "../components/LogOutButton/LogOutButton.jsx";
import PointDataForm from "../components/PointDataForm/PointDataForm.jsx";
import {useEffect, useState} from "react";
import axiosUtil from "../util/AxiosUtil.jsx";
import GraphFromContainer from "../components/GraphFormContainer/GraphFromContainer.jsx";
import HistoryTableContainer from "../components/HistoryTableContainer/HistoryTableContainer.jsx";

function MainPage() {
    const [radius, setRadius] = useState(1);
    const [history, setHistory] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    
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
            <GraphFromContainer>
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
            </GraphFromContainer>
            <HistoryTableContainer>
                <HistoryTable
                    history={history}
                />
            </HistoryTableContainer>
        </>
    );
}

export default MainPage;
