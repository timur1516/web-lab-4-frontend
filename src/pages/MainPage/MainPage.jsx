import Graph from "../../components/Graph/Graph.jsx";
import HistoryTable from "../../components/HistoryTable/HistoryTable.jsx";
import LogOutButton from "../../components/LogOutButton/LogOutButton.jsx";
import PointForm from "../../components/Form/PointForm/PointForm.jsx";
import {useEffect, useRef, useState} from "react";
import axiosUtil from "../../util/AxiosUtil.jsx";
import Header from "../../components/Layout/Header.jsx";
import ContentContainer from "../../components/Layout/ContentContainer.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import styles from "./MainPage.module.css";

function MainPage() {
    const [radius, setRadius] = useState(1);
    const [history, setHistory] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const drawPointRef = useRef();

    function loadPoints() {
        axiosUtil
            .get("main/get-points")
            .then((response) => {
                setHistory(response.data);
                setIsDataLoaded(true);
            });
    }

    useEffect(loadPoints, []);

    function checkPoint(x, y, r) {
        axiosUtil
            .post("main/check-point", {x, y, r})
            .then((response) => {
                setHistory((h) => [response.data, ...h]);
                drawPointRef.current.drawPoint(x, y, response.data.hit);
            });
    }

    function handleRadiusChange(value) {
        setRadius(Number(value));
    }

    if (!isDataLoaded) return (<></>);

    return (
        <>
            <Header/>
            <ContentContainer>
                <LogOutButton/>
                <div className={styles["graph-form-container"]}>
                    <PointForm
                        radius={radius}
                        radiusChangeHandler={handleRadiusChange}
                        pointChecker={checkPoint}
                    />
                    <Graph
                        radius={radius}
                        pointChecker={checkPoint}
                        history={history}
                        ref={drawPointRef}
                    />
                </div>
                <div className={styles["history-table-container"]}>
                    <HistoryTable
                        history={history}
                    />
                </div>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default MainPage;
