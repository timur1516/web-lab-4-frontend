import styles from "./ErrorMessageContainer.module.css"
import PropTypes from "prop-types";

function ErrorMessageContainer(props) {
    const {children} = props;
    return(
        <div className={styles["error-message-container"]}>{children}</div>
    );
}

ErrorMessageContainer.propTypes = {
    children: PropTypes.node
};

export default ErrorMessageContainer;
