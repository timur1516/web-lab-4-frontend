import {useState, useEffect} from "react";
import {StatusCodes} from "http-status-codes";
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import Input from "../../UserInput/Input/Input.jsx";
import PasswordInput from "../../UserInput/Input/PasswordInput.jsx";
import styles from "./EditProfileForm.module.css"
import {useSelector} from "react-redux";
import axiosUtil from "../../../util/AxiosUtil.js";
import "../From.css"
import axios from "axios";
import ShowAblePasswordInput from "../../UserInput/Input/ShowAblePasswordInput/ShowAblePasswordInput.jsx";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function EditProfileForm() {
    const curFirstName = useSelector(state => state.userReducer.firstName);
    const curLastName = useSelector(state => state.userReducer.lastName);
    const username = useSelector(state => state.userReducer.username);
    const [firstName, setFirstName] = useState(curFirstName);
    const [lastName, setLastName] = useState(curLastName);
    const [oldPwd, setOldPwd] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const validateOldPwd = (value) => value !== "" || pwd === "" && pwdConfirm === "";
    const validatePwd = (value) => PWD_REGEX.test(value) || pwd === "" && pwdConfirm === "" && value === "";
    const validatePwdConfirm = (value) => pwd === value && validatePwd(pwd);
    const validateFirstName = (value) => value !== "";
    const validateLastName = (value) => value !== "";

    useEffect(() => {
        setErrorMsg("");
    }, [firstName, lastName, pwd, pwdConfirm, oldPwd]);

    useEffect(() => {
        setFirstName(curFirstName);
        setLastName(curLastName);
    }, [curFirstName, curLastName]);

    function cleanForm(){
        setErrorMsg("");
        setFirstName(firstName);
        setLastName(lastName);
        setOldPwd("");
        setPwd("");
        setPwdConfirm("");
    }

    async function handleProfileEdit(event) {
        event.preventDefault();

        if (!validateFirstName(firstName) ||
            !validateLastName(lastName) ||
            !validatePwd(pwd) ||
            !validatePwdConfirm(pwdConfirm) ||
            !validateOldPwd(oldPwd)) {
            setErrorMsg("Данные не валидны");
            return;
        }

        if (firstName !== curFirstName || lastName !== curLastName) {
            axiosUtil
                .post("main/update-user-details", {
                    firstName: firstName,
                    lastName: lastName
                })
                .then(cleanForm)
                .catch(() => {
                    setErrorMsg("Возникла непредвиденная ошибка на сервере");
                });
        }
        if (pwd !== "") {
            axios
                .post("auth/update-password", {
                    oldPassword: oldPwd,
                    newPassword: pwd,
                    username: username
                })
                .then(cleanForm)
                .catch((error) => {
                    if (error.response?.status === StatusCodes.FORBIDDEN)
                        setErrorMsg("Неверный пароль");
                    else
                        setErrorMsg("Возникла непредвиденная ошибка на сервере");
                });
        }
    }

    return (
        <form onSubmit={handleProfileEdit} className={styles["form"]}>
            <ErrorMessage error={errorMsg}/>
            <div className="input-container">
                <label htmlFor="firstName">
                    Имя:
                </label>
                <Input
                    id="firstName"
                    value={firstName}
                    onChange={setFirstName}
                    placeholder={"Введите имя"}
                    validator={validateFirstName}
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="lastName">
                    Фамилия:
                </label>
                <Input
                    id="lastName"
                    value={lastName}
                    onChange={setLastName}
                    placeholder={"Введите фамилию"}
                    validator={validateLastName}
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="oldPwd">
                    Старый пароль:
                </label>
                <ShowAblePasswordInput
                    id="oldPwd"
                    value={oldPwd}
                    onChange={setOldPwd}
                    placeholder={"Введите старый пароль"}
                    validator={validateOldPwd}
                    tip="8-24 символа. Должен включать заглавные, строчные буквы, цифры и спецсимволы (!@#$%)."
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="pwd">
                    Новый пароль:
                </label>
                <ShowAblePasswordInput
                    id="pwd"
                    value={pwd}
                    onChange={setPwd}
                    placeholder={"Введите новый пароль"}
                    validator={validatePwd}
                    tip="8-24 символа. Должен включать заглавные, строчные буквы, цифры и спецсимволы (!@#$%)."
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="pwdConfirm">
                    Повторите новый пароль:
                </label>
                <ShowAblePasswordInput
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
                disabled={!validateFirstName(firstName) || !validateLastName(lastName) || !validatePwd(pwd) || !validatePwdConfirm(pwdConfirm) || !validateOldPwd(oldPwd)}
            >
                Сохранить
            </button>
        </form>
    );
}

export default EditProfileForm;