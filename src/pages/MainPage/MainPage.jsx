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
import {addToHistory, setIsDataLoaded} from "../../redux/HistorySlice.js";
import {useEffect} from "react";
import CleanTableButton from "../../components/CleanTableButton/CleanTableButton.jsx";
import {useSpring, animated} from "react-spring";
import {setIsAnimation, setShowGif} from "../../redux/AnimationSlice.js";
import EditProfileButton from "../../components/EditProfileButton/EditProfileButton.jsx";
import {loadPoints, loadUserData} from "../../util/ServerDataLoadUtil.js";
import saveTokenToCookies from "../../util/TokenUtil.js";
import {generateAvatar, sendAvatarToServer} from "../../util/AvatarUtil.js";
import {switchTheme} from "../../util/ThemeUtil.js";

function MainPage() {
    const dispatch = useDispatch();
    const isAnimation = useSelector(state => state.animationReducer.isAnimation);
    const isDataLoaded = useSelector(state => state.historyReducer.isDataLoaded);
    const username = useSelector(state => state.userReducer.username);

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
            onRest: finishUserChange
        });
    }

    function reverseDashboard() {
        dashboardApi.start({
            from: {transform: "scale(0) rotate(180deg)"},
            to: {transform: "scale(1) rotate(0deg)"},
            onRest: reversePortal
        });
    }

    function reversePortal(){
        portalApi.start({
            from: {transform: "translate(-50%, -50%) scale(1)"},
            to: {transform: "translate(-50%, -50%) scale(0)"},
            onRest: () => {
                dispatch(setShowGif(false));
                dispatch(setIsAnimation(false));
            }
        });
    }

    async function finishUserChange() {
        await changeUser();
        switchTheme();
        resetAnimation();
    }

    function resetAnimation() {
        overlayApi.start({
            from: {backgroundColor: "black"},
            to: {backgroundColor: "transparent"},
            onRest: async () => {
                reverseDashboard();
            }
        });
    }

    async function changeUser() {
        dispatch(setIsDataLoaded(false));
        const response = await axiosUtil.post("main/change-user");
        saveTokenToCookies(response.data.accessToken, "accessToken");
        saveTokenToCookies(response.data.refreshToken, "refreshToken");
        if (await loadUserData(dispatch)) {
            const newAvatar = generateAvatar(username);
            await sendAvatarToServer(newAvatar, "svg+xml");
            await loadUserData(dispatch);
        }
        await loadPoints(dispatch);
        dispatch(setIsDataLoaded(true));
    }

    function checkPoint(x, y, r) {
        axiosUtil
            .post("main/check-point", {x, y, r})
            .then((response) => {
                dispatch(addToHistory(response.data));
            });
    }

    useEffect(() => {
        if (isAnimation) animatePortal();
    }, [isAnimation]);

    useEffect(() => {
        loadUserData(dispatch);
        loadPoints(dispatch);
    }, []);

    if (!isDataLoaded) return (<>{isAnimation && <Overlay style={overlayStyle}/>}</>);

    return (
        <>
            <Header/>
            <ContentContainer>
                <div className={styles["menu-container"]}>
                    <div className={styles["menu-logout-container"]}>
                        <LogOutButton/>
                    </div>
                    <div className={styles["menu-control-container"]}>
                        <CleanTableButton/>
                        <ChangeDimensionButton/>
                    </div>
                    <div className={styles["menu-user-container"]}>
                        <div className={styles["menu-user-info-container"]}>
                            <p className={styles["username"]}>{username}</p>
                            <EditProfileButton/>
                        </div>
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
