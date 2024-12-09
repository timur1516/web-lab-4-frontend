import Header from "../../components/Layout/Header.jsx";
import ContentContainer from "../../components/Layout/ContentContainer.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import SignInForm from "../../components/Form/AuthForm/SignInForm.jsx";
import styles from "./AuthPage.module.css"
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {loadTheme, setDefaultTheme} from "../../util/ThemeUtil.js";
import Cookies from "js-cookie";

function SignInPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("refreshToken")) {
            loadTheme();
            navigate("/main");
        }
        setDefaultTheme();
    }, []);
    return (
        <>
            <Header/>
            <ContentContainer>
                <div className={styles["form-container"]}>
                    <div className={styles["form-header-container"]}>
                        <span>Вход</span>
                    </div>
                    <SignInForm/>
                    <div className={styles["form-footer-container"]}>
                        <p>Не аккаунта?</p>
                        <Link to="/sign-up">Зарегистрироваться</Link>
                    </div>
                </div>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default SignInPage;
