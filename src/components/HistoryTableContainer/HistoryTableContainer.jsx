import styles from "./HistoryTableContainer.module.css"
import PropTypes from "prop-types";

function HistoryTableContainer(props) {
    const {children} = props;
    return(
        <div className={styles["history-table-container"]}>{children}</div>
    );
}

HistoryTableContainer.propTypes = {
    children: PropTypes.node
};

export default HistoryTableContainer;
