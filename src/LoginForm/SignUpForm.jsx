import styles from "./LoginForm.module.css";
import {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {StatusCodes} from "http-status-codes";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const LOGIN_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUpForm() {
    const [login, setLogin] = useState("");
    const [validLogin, setValidLogin] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [pwdConfirm, setPwdConfirm] = useState("");
    const [validPwdConfirm, setValidPwdConfirm] = useState(false);
    const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        setErrorMsg("");
    }, [login, pwd, pwdConfirm]);

    useEffect(() => {
        setValidLogin(LOGIN_REGEX.test(login));
    }, [login]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidPwdConfirm(pwd === pwdConfirm);
    }, [pwd, pwdConfirm]);

    function handleLoginChange(event) {
        setLogin(event.target.value);
    }

    function handlePwdChange(event) {
        setPwd(event.target.value);
    }

    function handlePwdConfirmChange(event) {
        setPwdConfirm(event.target.value);
    }

    async function handleSignUp(event) {
        event.preventDefault();

        if (!validLogin || !validPwd || !validPwdConfirm) {
            setErrorMsg("Данные не валидны");
            return;
        }

        axios
            .post("auth/signup", {username: login, password: pwd})
            .then((response) => {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                navigate("/main");
            })
            .catch((error) => {
                if(!error.response) {
                    setErrorMsg("Сервер временно не доступен, попробуйте позже");
                    return;
                }
                if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
                    setErrorMsg("Возникла непредвиденная ошибка на сервере");
                if (error.response.status === StatusCodes.CONFLICT)
                    setErrorMsg("Имя пользователя занято");
            });
    }

    return (
        <div className={styles["registration-form-container"]}>
            <div className={styles["header-container"]}>
                <span>Регистрация</span>
            </div>
            <ErrorMessage error={errorMsg}/>
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
                    {login && loginFocus && !validLogin
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
                    {pwd && pwdFocus && !validPwd
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
                        Повторите пароль: {validPwdConfirm && validPwd ? '✅' : '❌'}
                    </label>
                    <input
                        type="password"
                        id="pwdConfirm"
                        value={pwdConfirm}
                        onChange={handlePwdConfirmChange}
                        onFocus={() => setPwdConfirmFocus(true)}
                        onBlur={() => setPwdConfirmFocus(false)}
                    />
                    {pwdConfirm && pwdConfirmFocus && !validPwdConfirm
                        ? <p className={styles["input-tip"]}>
                            Пароли должны совпадать.
                        </p>
                        : <></>
                    }
                </div>
                <button className={styles["submit-button"]}
                        type="submit"
                        disabled={!(validLogin && validPwd && validPwdConfirm)}>
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