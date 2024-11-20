import styles from "./LoginForm.module.css";
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

const LOGIN_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUpForm(){
    const [login, setLogin] = useState("");
    const [validLogin, setValidLogin] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [pwdConfirm, setPwdConfirm] = useState("");
    const [validPwdonfirm, setvalidPwdConfirm] = useState(false);
    const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);
    
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setErrorMsg("");
    }, [login, pwd, pwdConfirm]);

    useEffect(() => {
        setValidLogin(LOGIN_REGEX.test(login));
    }, [login]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setvalidPwdConfirm(pwd === pwdConfirm);
    }, [pwd, pwdConfirm]);

    function handleLoginChange(event){
        setLogin(event.target.value);
    }

    function handlePwdChange(event){
        setPwd(event.target.value);
    }

    function handlePwdConfirmChange(event){
        setPwdConfirm(event.target.value);
    }

    function handleSignUp(event){
        event.preventDefault();
        
        if(!validLogin || !validPwd || !validPwdonfirm){
            setErrorMsg("Данные не валидны");
            return;
        }

        //Some server logic
        setLogin("");
        setPwd("");
        setPwdConfirm("");
    }

    return(
        <div className={styles["registration-form-container"]}>
            <div className={styles["header-container"]}>
                <span>Регистрация</span>
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
                        Логин: {validLogin ? '✅' : '❌'}
                    </label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={handleLoginChange}
                        onFocus={() => setLoginFocus(true)}
                        onBlur={() => setLoginFocus(false)}
                    />
                    { login && loginFocus && !validLogin 
                        ? <p className={styles["input-tip"]}>
                        4-24 символа.<br/>
                        Первый символ - буква.<br/>
                        Разрешены латинские буквы и цифры.
                        </p>
                        : <></>
                    }
                </div>
                <div className={styles["input-container"]}>
                    <label htmlFor="pwd">
                        Пароль: {validPwd ? '✅' : '❌'}
                    </label>
                    <input
                        type="password"
                        id="pwd"
                        value={pwd}
                        onChange={handlePwdChange}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    { pwd && pwdFocus && !validPwd 
                        ? <p className={styles["input-tip"]}>
                        8-24 символа.<br/>
                        Должен включать большие и маленькие латинские символы, цифры и спецсимволы<br/>
                        Разрешеные спецсимволы: !@#$%.
                        </p>
                        : <></>
                    }
                </div>
                <div className={styles["input-container"]}>
                    <label htmlFor="pwdConfirm">
                        Повторите пароль: {validPwdonfirm && validPwd ? '✅' : '❌'}
                    </label>
                    <input
                        type="password"
                        id="pwdConfirm"
                        value={pwdConfirm}
                        onChange={handlePwdConfirmChange}
                        onFocus={() => setPwdConfirmFocus(true)}
                        onBlur={() => setPwdConfirmFocus(false)}
                    />
                    { pwdConfirm && pwdConfirmFocus && !validPwdonfirm 
                        ? <p className={styles["input-tip"]}>
                        Пароли должны совпадать.
                        </p>
                        : <></>
                    }
                </div>
                <button className={styles["submit-button"]}
                    type="submit"
                    disabled={validLogin && validPwd && validPwdonfirm ? false : true}>
                        Зарегистрироваться
                </button>
            </form>
            <div className={styles["change-form-container"]}>
                <p>Уже есть аккаунт?</p>
                <Link to="/sign-in">Войти</Link>
            </div>
        </div>
    );
}

export default SignUpForm;