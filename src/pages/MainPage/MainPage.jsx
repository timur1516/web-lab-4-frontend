import Graph from "../../components/Graph/Graph.jsx";
import HistoryTable from "../../components/HistoryTable/HistoryTable.jsx";
import LogOutButton from "../../components/LogOutButton/LogOutButton.jsx";
import PointForm from "../../components/Form/PointForm/PointForm.jsx";
import axiosUtil from "../../util/AxiosUtil.js";
import Header from "../../components/Layout/Header.jsx";
import ContentContainer from "../../components/Layout/ContentContainer.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import styles from "./MainPage.module.css";
import BackgroundGif from "../../components/BackgroundGif/BackgroundGif.jsx";
import {useDispatch, useSelector} from "react-redux";
import ChangeDimensionButton from "../../components/ChangeDimensionButton/ChangeDimensionButton.jsx";
import Overlay from "../../components/Overlay/Overlay.jsx";
import {addToHistory} from "../../redux/HistorySlice.js";
import {useEffect, useRef} from "react";
import CleanTableButton from "../../components/CleanTableButton/CleanTableButton.jsx";
import {useSpring, animated} from "react-spring";
import {setIsAnimation, setShowGif} from "../../redux/AnimationSlice.js";
import EditProfileButton from "../../components/EditProfileButton/EditProfileButton.jsx";
import {loadPoints, loadUserData} from "../../util/ServerDataLoadUtil.js";

function MainPage() {
    const dispatch = useDispatch();
    const isAnimation = useSelector(state => state.animationReducer.isAnimation);
    const isDataLoaded = useSelector(state => state.historyReducer.isDataLoaded);
    const drawPointRef = useRef()
    const username = useSelector(state => state.userReducer.username);
    const avatar = useSelector(state => state.userReducer.avatar);

    const [portalStyle, portalApi] = useSpring(() => ({
        from: {transform: "translate(-50%, -50%) scale(0)"},
        config: {duration: 1000}
    }));

    const [dashboardStyle, dashboardApi] = useSpring(() => ({
        from: {transform: "scale(1)"},
        config: {duration: 1000}
    }));

    const [overlayStyle, overlayApi] = useSpring(() => ({
        from: {backgroundColor: "transparent"},
        config: {duration: 3000}
    }));

    function animatePortal() {
        dispatch(setShowGif(true));
        portalApi.start({
            from: {transform: "translate(-50%, -50%) scale(0)"},
            to: {transform: "translate(-50%, -50%) scale(1)"},
            onRest: animateDashboard
        });
    }

    function animateDashboard() {
        dashboardApi.start({
            from: {transform: "scale(1) rotate(0deg)"},
            to: {transform: "scale(0) rotate(180deg)"},
            onRest: animateOverlay
        });
    }

    function animateOverlay() {
        overlayApi.start({
            from: {backgroundColor: "transparent"},
            to: {backgroundColor: "black"},
            onRest: resetAnimation
        });
    }

    function resetAnimation() {
        dispatch(setShowGif(false));
        portalApi.set({transform: "translate(-50%, -50%) scale(0)"});
        dashboardApi.set({transform: "scale(1)"});
        overlayApi.start({
            from: {backgroundColor: "black"},
            to: {backgroundColor: "transparent"},
            onRest: () => {
                dispatch(setIsAnimation(false));
            }
        });
    }

    useEffect(() => {
        if (isAnimation) animatePortal();
    }, [isAnimation]);

    function checkPoint(x, y, r) {
        axiosUtil
            .post("main/check-point", {x, y, r})
            .then((response) => {
                dispatch(addToHistory(response.data));
                drawPointRef.current.drawPoint(x, y, response.data.hit);
            });
    }

    useEffect(() => {
        loadUserData(dispatch);
        loadPoints(dispatch);
    }, []);

    if (!isDataLoaded) return (<></>);

    return (
        <>
            <Header/>
            <ContentContainer>
                <div className={styles["menu-container"]}>
                    <LogOutButton/>
                    <div className={styles["menu-control-container"]}>
                        <CleanTableButton/>
                        <ChangeDimensionButton/>
                    </div>
                    <div className={styles["menu-user-container"]}>
                        <p>{username}</p>
                        <EditProfileButton/>
                    </div>
                </div>
                <div className={styles["dashboard-container"]}>
                    <BackgroundGif
                        gifSrc="/portal.gif"
                        style={portalStyle}
                    />
                    <animated.div style={dashboardStyle} className={styles["graph-form-container"]}>
                        <PointForm
                            pointChecker={checkPoint}
                        />
                        <Graph
                            pointChecker={checkPoint}
                            ref={drawPointRef}
                        />
                    </animated.div>
                </div>
                <div className={styles["history-table-container"]}>
                    <HistoryTable/>
                </div>
            </ContentContainer>
            <Footer/>
            {isAnimation && <Overlay style={overlayStyle}/>}
        </>
    );
}

export default MainPage;
