import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import styles from "./ErrorPage.module.css"

function ErrorPage() {
    return (
        <div className={styles["error-message-container"]}>
            <ErrorMessage
                error={"Возникла ошибка на сервере. Пожалуйста, попробуйте повторить попытку позже"}
            />
        </div>
    );
}

export default ErrorPage;
