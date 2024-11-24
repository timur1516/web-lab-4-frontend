import styles from "./ErrorMessage.module.css"
import PropTypes from "prop-types";

function ErrorMessage(props) {
    return (
        props.error
            ? <span className={styles["error-message"]}>{props.error}</span>
            : <></>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.string
}

export default ErrorMessage;
