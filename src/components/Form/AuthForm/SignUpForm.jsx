import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {StatusCodes} from "http-status-codes";
import axios from "axios";
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import Input from "../../UserInput/Input/Input.jsx";
import PasswordInput from "../../UserInput/Input/PasswordInput.jsx";
import styles from "./AuthForm.module.css"
import saveTokenToCookies from "../../../util/TokenUtil.js";
import {generateAvatar, sendAvatarToServer} from "../../../util/AvatarUtil.js";
import "../From.css"

const LOGIN_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUpForm() {
    const [login, setLogin] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate()

    const validateLogin = (value) => LOGIN_REGEX.test(value);
    const validatePwd = (value) => PWD_REGEX.test(value);
    const validatePwdConfirm = (value) => pwd === value && validatePwd(pwd);

    useEffect(() => {
        setErrorMsg("");
    }, [login, pwd, pwdConfirm]);

    async function handleSignUp(event) {
        event.preventDefault();

        if (!validateLogin(login) || !validatePwd(pwd) || !validatePwdConfirm(pwdConfirm)) {
            setErrorMsg("Данные не валидны");
            return;
        }

        try {
            const response = await axios.post("auth/signup", {username: login, password: pwd});
            saveTokenToCookies(response.data.accessToken, "accessToken");
            saveTokenToCookies(response.data.refreshToken, "refreshToken");
            const avatar = generateAvatar(login);
            await sendAvatarToServer(avatar, "svg+xml");
            navigate("/main");
        } catch (error) {
            if (!error.response)
                setErrorMsg("Сервер временно не доступен, попробуйте позже");
            else if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
                setErrorMsg("Возникла непредвиденная ошибка на сервере");
            else if (error.response.status === StatusCodes.CONFLICT)
                setErrorMsg("Имя пользователя занято");
        }
    }

    return (
        <form onSubmit={handleSignUp} className={styles["form"]}>
            <ErrorMessage error={errorMsg}/>
            <div className="input-container">
                <label htmlFor="login">
                    Логин:
                </label>
                <Input
                    id="login"
                    value={login}
                    onChange={setLogin}
                    placeholder={"Введите логин"}
                    validator={validateLogin}
                    tip="4-24 символа. Первый символ - буква. Разрешены латинские буквы и цифры."
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="pwd">
                    Пароль:
                </label>
                <PasswordInput
                    id="pwd"
                    value={pwd}
                    onChange={setPwd}
                    placeholder={"Введите пароль"}
                    validator={validatePwd}
                    tip="8-24 символа. Должен включать заглавные, строчные буквы, цифры и спецсимволы (!@#$%)."
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="pwdConfirm">
                    Повторите пароль:
                </label>
                <PasswordInput
                    id="pwdConfirm"
                    value={pwdConfirm}
                    onChange={setPwdConfirm}
                    placeholder={"Повторите пароль"}
                    validator={validatePwdConfirm}
                    tip="Пароли должны совпадать."
                    isRequired
                />
            </div>
            <button
                className="button"
                type="submit"
                disabled={!(validateLogin(login) && validatePwd(pwd) && validatePwdConfirm(pwdConfirm))}
            >
                Зарегистрироваться
            </button>
        </form>
    );
}

export default SignUpForm;