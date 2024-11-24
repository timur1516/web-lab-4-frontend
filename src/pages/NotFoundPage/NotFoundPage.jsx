import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import styles from "./NotFoundPage.module.css"

function NotFoundPage(){
    return(
        <div className={styles["not-found-message-container"]}>
            <ErrorMessage
                error={"Похоже данной страницы не существует"}
            />
        </div>
    );
}

export default NotFoundPage;
