import React, { useState } from "react";
import styles from "./PointDataForm.module.css";

function PointDataForm(props) {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    function handleXChange(event){
        setX(Number(event.target.value));
    }

    function handleYChange(event){
        setY(Number(event.target.value));
    }

    function submitForm(event){
        event.preventDefault();
        props.pointChecker(x, y, props.radius);
    }

    return (
        <form className={styles["form"]} onSubmit={submitForm}>
            <div className={styles["input-container"]}>
                <label htmlFor="x">
                    X:
                </label>
                <input
                    value={x}
                    onChange={handleXChange}
                    id="x"
                    type="number"
                    placeholder="Введите X"
                    min="-3"
                    max="3"
                    step="1"
                />
            </div>
            <div className={styles["input-container"]}>
                <label htmlFor="y">
                    Y:
                </label>
                <input
                    value={y}
                    onChange={handleYChange}
                    id="y"
                    type="number"
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
                <input
                    value={props.radius}
                    onChange={props.radiusChangeHandler}
                    id="r"
                    type="number"
                    placeholder="Введите R"
                    min="1"
                    max="5"
                    step="1"
                />
            </div>
            <button className={styles["submit-button"]}
                type="submit">
                Проверить
            </button>
        </form>
    );
}

export default PointDataForm;
