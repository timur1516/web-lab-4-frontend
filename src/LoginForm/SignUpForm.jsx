import styles from "./LoginForm.module.css";
import {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {StatusCodes} from "http-status-codes";

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

    function handleLoginChange(event){
        setLogin(event.target.value);
    }

    function handlePwdChange(event){
        setPwd(event.target.value);
    }

    function handlePwdConfirmChange(event){
        setPwdConfirm(event.target.value);
    }

    async function handleSignUp(event){
        event.preventDefault();
        
        if(!validLogin || !validPwd || !validPwdConfirm){
            setErrorMsg("Данные не валидны");
            return;
        }

        const response = await fetch(
            "http://localhost:8080/web4_backend-1.0-SNAPSHOT/api/auth/signup", {
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
        if(response.status === StatusCodes.CONFLICT){
            setErrorMsg("Имя пользователя занято");
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
                    { pwdConfirm && pwdConfirmFocus && !validPwdConfirm
                        ? <p className={styles["input-tip"]}>
                        Пароли должны совпадать.
                        </p>
                        : <></>
                    }
                </div>
                <button className={styles["submit-button"]}
                    type="submit"
                    disabled={validLogin && validPwd && validPwdConfirm ? false : true}>
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