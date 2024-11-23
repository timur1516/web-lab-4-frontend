import styles from "./ErrorPage.module.css"

function ErrorPage(){
    return(
        <div className={styles["error-container"]}>
            <span>
                Возникла ошибка на сервере<br/>
                Пожалуйста, попробуйте повторить попытку позже
            </span>
        </div>
    );
}

export default ErrorPage;
