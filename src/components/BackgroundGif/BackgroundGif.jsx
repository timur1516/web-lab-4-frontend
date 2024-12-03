import styles from "./BackgroundGif.module.css"
import {useSelector} from "react-redux";
import {animated} from "react-spring";

const BackgroundGif = ({gifSrc, style}) => {
    const showGif = useSelector(state => state.animationReducer.showGif);
    return (
        showGif
            ? <animated.div style={style} className={styles["background-gif"]}>
                <img src={gifSrc} alt="Background animation"/>
            </animated.div>
            : <></>
    );
};

export default BackgroundGif;
