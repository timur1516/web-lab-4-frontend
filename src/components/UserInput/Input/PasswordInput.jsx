import Input from "./Input.jsx";
import PropTypes from "prop-types";

function PasswordInput({ showPassword, ...rest }) {
    const inputType = showPassword ? "text" : "password";
    return <Input type={inputType} {...rest} />;
}

PasswordInput.propTypes = {
    showPassword: PropTypes.bool, // Специфичный атрибут для пароля
};

export default PasswordInput;
