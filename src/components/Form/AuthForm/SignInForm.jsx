import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {StatusCodes} from "http-status-codes";
import axios from "axios";
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import Input from "../../UserInput/Input/Input.jsx";
import PasswordInput from "../../UserInput/Input/PasswordInput.jsx";
import styles from "./AuthForm.module.css";
import saveTokenToCookies from "../../../util/TokenUtil.js";
import "../From.css"

function SignInForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setErrorMsg("");
    }, [username, password]);

    const validateUsername = (value) => value !== "";
    const validatePassword = (value) => value !== "";

    async function handleSignIn(event) {
        event.preventDefault();

        if (!validateUsername(username) || !validatePassword(password)) {
            setErrorMsg("Данные не валидны");
            return;
        }

        axios
            .post("auth/login", {username: username, password: password})
            .then((response) => {
                saveTokenToCookies(response.data.accessToken, "accessToken");
                saveTokenToCookies(response.data.refreshToken, "refreshToken");
                navigate("/main");
            })
            .catch((error) => {
                if (error.response.status === StatusCodes.FORBIDDEN)
                    setErrorMsg("Неверный логин или пароль");
                else
                    setErrorMsg("Возникла непредвиденная ошибка на сервере");
            });
    }

    return (
        <form onSubmit={handleSignIn} className={styles["form"]}>
            <ErrorMessage error={errorMsg}/>
            <div className="input-container">
                <label htmlFor="login">
                    Логин:
                </label>
                <Input
                    id="login"
                    value={username}
                    onChange={setUsername}
                    placeholder={"Введите логин"}
                    validator={validateUsername}
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="pwd">
                    Пароль:
                </label>
                <PasswordInput
                    id="pwd"
                    value={password}
                    onChange={setPassword}
                    placeholder={"Введите пароль"}
                    validator={validatePassword}
                    isRequired
                />
            </div>
            <button
                className="button"
                type="submit"
                disabled={!(validateUsername(username) && validatePassword(password))}
            >
                Войти
            </button>
        </form>
    );
}

export default SignInForm;
