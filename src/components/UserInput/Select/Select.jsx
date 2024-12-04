import {useEffect, useState} from "react";
import styles from "../Input.module.css";

function Select({
                    id,
                    selectedValue,
                    onChange,
                    values,
                    validator = (value) => value || true,
                    isRequired = false,
                    ...rest
                }) {

    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(validator(selectedValue));
    }, [selectedValue, validator]);

    return (
        <select
            className={`
                    ${styles["input-field"]}
                    ${isRequired ? (isValid ? styles["valid-input-field"] : styles["invalid-input-field"]) : ""}
                `}
            id={id}
            value={selectedValue}
            onChange={(e) => onChange(e.target.value)}
            {...rest}
        >
            {values.map((value, index) => (
                <option key={index} value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
}

export default Select;
