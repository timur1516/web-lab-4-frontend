import styles from './Overlay.module.css';
import {animated} from "react-spring";

function Overlay({style}) {
    return (
        <animated.div style={style} className={styles["overlay"]}/>
    );
}

export default Overlay;
