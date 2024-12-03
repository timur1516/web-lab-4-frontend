import {useState, useEffect} from "react";
import {StatusCodes} from "http-status-codes";
import axios from "axios";
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import Input from "../../Input/Input.jsx";
import PasswordInput from "../../Input/PasswordInput.jsx";
import styles from "./EditProfileForm.module.css"
import {setShowModalWindow} from "../../../redux/ModalWindowSlice.js";
import {useDispatch, useSelector} from "react-redux";
import axiosUtil from "../../../util/AxiosUtil.js";

const LOGIN_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function EditProfileForm() {
    const username = useSelector(state => state.userReducer.username);
    const [login, setLogin] = useState(username);
    const [oldPwd, setOldPwd] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const validateLogin = (value) => LOGIN_REGEX.test(value);
    const validateOldPwd = (value) => value !== "" || pwd === "" && pwdConfirm === "";
    const validatePwd = (value) => PWD_REGEX.test(value) || pwd === "" && pwdConfirm === "" && value === "";
    const validatePwdConfirm = (value) => pwd === value && isPwdValid;

    const isLoginValid = validateLogin(login);
    const isOldPwdValid = validateOldPwd(oldPwd);
    const isPwdValid = validatePwd(pwd);
    const isPwdConfirmValid = validatePwdConfirm(pwdConfirm);

    useEffect(() => {
        setErrorMsg("");
    }, [login, pwd, pwdConfirm, oldPwd]);

    useEffect(() => {setLogin(username)}, [username]);

    async function handleProfileEdit(event) {
        event.preventDefault();

        if (!isLoginValid || !isPwdValid || !isPwdConfirmValid || !isOldPwdValid) {
            setErrorMsg("Данные не валидны");
            return;
        }

        if(login !== username) {
            axiosUtil
                .post("main/update-username", {username: login})
                .then(() => {
                    setErrorMsg("");
                    setOldPwd("");
                    setErrorMsg("");
                    setOldPwd("");
                })
                .catch((error) => {
                    if (!error.response)
                        setErrorMsg("Сервер временно не доступен, попробуйте позже");
                    else if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
                        setErrorMsg("Возникла непредвиденная ошибка на сервере");
                    else if (error.response.status === StatusCodes.CONFLICT)
                        setErrorMsg("Имя пользователя занято");
                });
        }
        if(pwd !== "") {
            axiosUtil
                .post("main/update-password", {password: pwd})
                .then(() => {
                    setErrorMsg("");
                    setOldPwd("");
                    setErrorMsg("");
                    setOldPwd("");
                })
                .catch((error) => {
                    if (!error.response)
                        setErrorMsg("Сервер временно не доступен, попробуйте позже");
                    else if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
                        setErrorMsg("Возникла непредвиденная ошибка на сервере");
                });
        }
    }

    return (
        <form onSubmit={handleProfileEdit} className={styles["form"]}>
            <ErrorMessage error={errorMsg}/>
            <div className={styles["input-container"]}>
                <label htmlFor="login">
                    Имя пользователя:
                </label>
                <Input
                    id="login"
                    value={login}
                    onChange={setLogin}
                    placeholder={"Введите имя пользователя"}
                    validator={validateLogin}
                    tip="4-24 символа. Первый символ - буква. Разрешены латинские буквы и цифры."
                    isRequired
                />
            </div>
            <div className={styles["input-container"]}>
                <label htmlFor="oldPwd">
                    Старый пароль:
                </label>
                <PasswordInput
                    id="oldPwd"
                    value={oldPwd}
                    onChange={setOldPwd}
                    placeholder={"Введите старый пароль"}
                    validator={validateOldPwd}
                    tip="8-24 символа. Должен включать заглавные, строчные буквы, цифры и спецсимволы (!@#$%)."
                    isRequired
                />
            </div>
            <div className={styles["input-container"]}>
                <label htmlFor="pwd">
                    Новый пароль:
                </label>
                <PasswordInput
                    id="pwd"
                    value={pwd}
                    onChange={setPwd}
                    placeholder={"Введите новый пароль"}
                    validator={validatePwd}
                    tip="8-24 символа. Должен включать заглавные, строчные буквы, цифры и спецсимволы (!@#$%)."
                    isRequired
                />
            </div>
            <div className={styles["input-container"]}>
                <label htmlFor="pwdConfirm">
                    Повторите новый пароль:
                </label>
                <PasswordInput
                    id="pwdConfirm"
                    value={pwdConfirm}
                    onChange={setPwdConfirm}
                    placeholder={"Повторите новый пароль"}
                    validator={validatePwdConfirm}
                    tip="Пароли должны совпадать."
                    isRequired
                />
            </div>
            <button
                className="button"
                type="submit"
                disabled={!(isLoginValid && isPwdValid && isPwdConfirmValid && isOldPwdValid)}
            >
                Сохранить
            </button>
        </form>
    );
}

export default EditProfileForm;