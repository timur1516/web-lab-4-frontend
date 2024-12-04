import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import NumberInput from "../../UserInput/Input/NumberInput.jsx";
import styles from "./PointForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setRadius} from "../../../redux/RadiusSlice.js";
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import Select from "../../UserInput/Select/Select.jsx";

function PointForm({pointChecker}) {
    const radius = useSelector((state) => state.radiusReducer.radius);
    const dispatch = useDispatch();

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [r, setR] = useState(radius);

    const [errorMsg, setErrorMsg] = useState("");

    const xValues = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
    const rValues = [-3, -2, -1, 0, 1, 2, 3, 4, 5];

    const validateX = (value) => xValues.includes(value);
    const validateR = (value) => rValues.includes(value) && Number(value) > 0;
    const validateY = (value) => -3 <= Number(value) <= 3;

    useEffect(() => {
        setErrorMsg("");
    },[x, y, r]);

    function handleRadiusChange(value) {
        setR(Number(value));
        dispatch(setRadius(Number(value) > 0 ? Number(value) : 0));
    }

    function handleXChange(value) {
        setX(Number(value));
    }

    function handleYChange(value) {
        setY(Number(value));
    }

    function submitForm(event) {
        event.preventDefault();

        if(!validateX(x) || !validateY(y) || !validateR(r)) {
            setErrorMsg("Данные не валидны");
            return;
        }

        pointChecker(x, y, r);
    }

    return (
        <form onSubmit={submitForm} className={styles["form"]}>
            <ErrorMessage error={errorMsg}/>
            <div className={styles["input-container"]}>
                <label htmlFor="x">
                    X:
                </label>
                <Select
                    selectedValue={x}
                    onChange={handleXChange}
                    values={xValues}
                    validator={validateX}
                    isRequired={true}
                    id="x"
                />
            </div>
            <div className={styles["input-container"]}>
                <label htmlFor="y">
                    Y:
                </label>
                <NumberInput
                    value={y}
                    onChange={handleYChange}
                    id="y"
                    placeholder="Введите Y"
                    min="-3"
                    max="3"
                    step="1"
                />
            </div>
            <div className={styles["input-container"]}>
                <label htmlFor="r">
                    R:
                </label>
                <Select
                    selectedValue={r}
                    onChange={handleRadiusChange}
                    values={rValues}
                    isRequired={true}
                    validator={validateR}
                    id="x"
                />
            </div>
            <button className="button"
                    type="submit"
                    disabled={!validateX(x) || !validateY(y)|| !validateR(r)    }>
                Проверить
            </button>
        </form>
    );
}

PointForm.propTypes = {
    pointChecker: PropTypes.func,
    radius: PropTypes.number,
    radiusChangeHandler: PropTypes.func
}

export default PointForm;
