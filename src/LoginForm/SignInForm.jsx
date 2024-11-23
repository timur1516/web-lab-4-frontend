import styles from "./LoginForm.module.css";
import {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {StatusCodes} from "http-status-codes";
import axios from "axios";

function SignInForm() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");

    const [pwd, setPwd] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setErrorMsg("");
    }, [login, pwd]);

    function handleLoginChange(event) {
        setLogin(event.target.value);
    }

    function handlePwdChange(event) {
        setPwd(event.target.value);
    }

    async function handleSignIn(event) {
        event.preventDefault();

        if (!login || !pwd) {
            setErrorMsg("Данные не валидны");
            return;
        }

        axios
            .post("auth/login", {username: login, password: pwd})
            .then((response) => {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                navigate("/main");
            })
            .catch((error) => {
                if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
                    setErrorMsg("Возникла непредвиденная ошибка на сервере");
                if (error.response.status === StatusCodes.NOT_FOUND)
                    setErrorMsg("Пользователь с таким именем не найден");
                if (error.response.status === StatusCodes.UNAUTHORIZED)
                    setErrorMsg("Неверный пароль");
            });
    }

    return (
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