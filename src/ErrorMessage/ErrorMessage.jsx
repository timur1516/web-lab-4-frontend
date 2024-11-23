import styles from "./ErrorMessage.module.css"
import PropTypes from "prop-types";

function ErrorMessage(props) {
    return (
        props.error
            ? <div className={styles["message-container"]}>
                <span className={styles["error-message"]}>{props.error}</span>
            </div>
            : <></>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.string
}

export default ErrorMessage;
