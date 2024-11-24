import styles from "./GraphFromContainer.module.css"
import PropTypes from "prop-types";

function GraphFromContainer(props) {
    const {children} = props;
    return(
        <div className={styles["graph-form-container"]}>{children}</div>
    );
}

GraphFromContainer.propTypes = {
    children: PropTypes.node
};

export default GraphFromContainer;
