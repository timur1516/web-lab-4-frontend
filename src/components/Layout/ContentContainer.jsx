import styles from "./Layout.module.css"
import PropTypes from "prop-types";

function ContentContainer({children}){
    return(
        <div className={styles["content-container"]}>{children}</div>
    )
}

ContentContainer.propTypes = {
    children: PropTypes.node
};

export default ContentContainer;
