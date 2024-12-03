import styles from './Overlay.module.css';
import {animated} from "react-spring";

function Overlay({style, children}) {
    return (
        <animated.div style={style} className={styles["overlay"]}>
            {children}
        </animated.div>
    );
}

export default Overlay;
