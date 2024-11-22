import Graph from "./Graph/Graph";
import HistoryTable from "./HistoryTable/HistoryTable";
import LogOutButton from "./LogOutButton/LogOutButton";
import styles from "./MainPage.module.css";
import PointDataForm from "./PointDataForm/PointDataForm";
import React, {useEffect, useState} from "react";
import {StatusCodes} from "http-status-codes";
import {useNavigate} from "react-router-dom";

function MainPage() {

    const [radius, setRadius] = useState(1);
    const [history, setHistory] = useState([]);

    const navigate = useNavigate();

    function handleRadiusChange(event) {
        setRadius(Number(event.target.value));
    }

    async function loadPoints() {
        const response = await fetch(
            "http://localhost:8080/web4_backend-1.0-SNAPSHOT/api/main/getpoints", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                method: "GET"
            }
        );
        if(!response.ok){
            sessionStorage.removeItem('token');
            navigate("/sign-in");
            return;
        }

        const authHeader = response.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1]; // Извлекаем токен после "Bearer"
            localStorage.setItem('token', token);
        }

        const data = await response.json();
        setHistory(data);
    }

    useEffect(() => {
        loadPoints();
    }, []);

    async function checkPoint(x, y, r) {
        const response = await fetch(
            "http://localhost:8080/web4_backend-1.0-SNAPSHOT/api/main/checkpoint", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                method: "POST",
                body: JSON.stringify({x: x, y: y, r: r})
            }
        );
        if(!response.ok){
            sessionStorage.removeItem('token');
            navigate("/sign-in");
            return;
        }

        const authHeader = response.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1]; // Извлекаем токен после "Bearer"
            localStorage.setItem('token', token);
        }

        const data = await response.json();
        setHistory((h) => [data, ...h]);

        return data.hit;
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
