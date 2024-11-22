import styles from "./LoginForm.module.css";
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import {StatusCodes} from "http-status-codes";

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

    async function handleSignIn(event){
        event.preventDefault();
        
        if(!login || !pwd){
            setErrorMsg("Данные не валидны");
            return;
        }

        const response = await fetch(
            "http://localhost:8080/web4_backend-1.0-SNAPSHOT/api/auth/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({username: login, password: pwd})
            }
        );
        if(response.status === StatusCodes.INTERNAL_SERVER_ERROR){
            setErrorMsg("Возникла непредвиденная ошибка на сервере");
            return;
        }
        if(response.status === StatusCodes.NOT_FOUND){
            setErrorMsg("Пользователь с таким именем не найден");
            return;
        }
        if(response.status === StatusCodes.UNAUTHORIZED){
            setErrorMsg("Неверный пароль");
            return;
        }

        try {
            const result = await response.json();
            localStorage.setItem("token", result.token);
            // eslint-disable-next-line no-unused-vars
        } catch (error){
            setErrorMsg("Непредвиденный ответ от сервера");
            return;
        }

        navigate("/main");

        setLogin("");
        setPwd("");
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
            <form onSubmit={handleSignIn}>
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