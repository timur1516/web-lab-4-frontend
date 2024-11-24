import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {StatusCodes} from "http-status-codes";
import axios from "axios";
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import Input from "../../Input/Input.jsx";
import PasswordInput from "../../Input/PasswordInput.jsx";
import styles from "./AuthForm.module.css";

function SignInForm() {

    const [login, setLogin] = useState("");
    const [pwd, setPwd] = useState("");

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setErrorMsg("");
    }, [login, pwd]);

    const isLoginValid = login !== "";
    const isPwdValid = pwd !== "";

    async function handleSignIn(event) {
        event.preventDefault();

        if (!isLoginValid || !isPwdValid) {
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
                if (!error.response)
                    setErrorMsg("Сервер временно не доступен, попробуйте позже");
                if (error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR)
                    setErrorMsg("Возникла непредвиденная ошибка на сервере");
                if (error.response?.status === StatusCodes.NOT_FOUND)
                    setErrorMsg("Пользователь с таким именем не найден");
                if (error.response?.status === StatusCodes.UNAUTHORIZED)
                    setErrorMsg("Неверный пароль");
            });
    }

    return (
        <form onSubmit={handleSignIn} className={styles["form"]}>
            <ErrorMessage error={errorMsg}/>
            <div className={styles["input-container"]}>
                <label htmlFor="login">
                    Введите логин:
                </label>
                <Input
                    id="login"
                    value={login}
                    onChange={setLogin}
                    validator={(value) => value !== ""}
                    isRequired
                />
            </div>
            <div className={styles["input-container"]}>
                <label htmlFor="pwd">
                    Введите пароль:
                </label>
                <PasswordInput
                    id="pwd"
                    value={pwd}
                    onChange={setPwd}
                    validator={(value) => value !== ""}
                    isRequired
                />
            </div>
            <button
                className="button"
                type="submit"
                disabled={!(isLoginValid && isPwdValid)}
            >
                Войти
            </button>
        </form>
    );
}

export default SignInForm;