import styles from "./LoginForm.module.css";
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';

function SignInForm(){
    const navigate = useNavigate();

    const [login, setLogin] = useState("");

    const [pwd, setPwd] = useState("");
    
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setErrorMsg("");
    }, [login, pwd]);

    function handleLoginChange(event){
        setLogin(event.target.value);
    }

    function handlePwdChange(event){
        setPwd(event.target.value);
    }

    function handleSignUp(event){
        event.preventDefault();
        
        if(!login || !pwd){
            setErrorMsg("Данные не валидны");
            return;
        }

        //Some server logic

        setLogin("");
        setPwd("");

        sessionStorage.setItem('isLoggedIn', true);

        navigate("/main");
    }

    return(
        <div className={styles["registration-form-container"]}>
            <div className={styles["header-container"]}>
                <span>Вход</span>
            </div>
            {errorMsg
                ? <div className={styles["message-container"]}>
                    <span className={styles["error-message"]}>{errorMsg}</span>
                </div>
                : <></>
            }
            <form onSubmit={handleSignUp}>
                <div className={styles["input-container"]}>
                    <label htmlFor="login">
                        Логин:
                    </label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={handleLoginChange}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <label htmlFor="pwd">
                        Пароль:
                    </label>
                    <input
                        type="password"
                        id="pwd"
                        value={pwd}
                        onChange={handlePwdChange}
                    />
                </div>
                <button className={styles["submit-button"]}
                    type="submit"
                    disabled={login && pwd ? false : true}>
                        Войти
                </button>
            </form>
            <div className={styles["change-form-container"]}>
                <p>Нет аккаунта?</p>
                <Link to="/sign-up">Зарегистрироваться</Link>
            </div>
        </div>
    );
}

export default SignInForm;