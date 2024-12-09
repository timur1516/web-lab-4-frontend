import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import styles from "./NotFoundPage.module.css"
import {useEffect} from "react";
import {setNotFoundPageTheme} from "../../util/ThemeUtil.js";

function NotFoundPage(){
    useEffect(setNotFoundPageTheme, []);
    return(
        <div className={styles["not-found-message-container"]}>
            <ErrorMessage
                error={"Похоже данной страницы не существует"}
            />
        </div>
    );
}

export default NotFoundPage;
