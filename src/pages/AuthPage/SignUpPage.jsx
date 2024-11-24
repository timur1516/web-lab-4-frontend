import Header from "../../components/Layout/Header.jsx";
import ContentContainer from "../../components/Layout/ContentContainer.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import SignUpForm from "../../components/Form/AuthForm/SignUpForm.jsx";
import styles from "./AuthPage.module.css";
import {Link} from "react-router-dom";

function SignUpPage(){
    return(
        <>
            <Header/>
            <ContentContainer>
                <div className={styles["form-container"]}>
                    <div className={styles["form-header-container"]}>
                        <span>Регистрация</span>
                    </div>
                    <SignUpForm/>
                    <div className={styles["form-footer-container"]}>
                        <p>Уже есть аккаунт?</p>
                        <Link to="/sign-in">Войти</Link>
                    </div>
                </div>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default SignUpPage;
