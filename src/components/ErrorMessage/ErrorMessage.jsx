import PropTypes from "prop-types";
import styles from "./ErrorMessage.module.css"

function ErrorMessage({error}) {
    return (
        error
            ? <span className={styles["error-message"]}>{error}</span>
            : <></>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.string
}

export default ErrorMessage;
