import styles from "./ChangeDimensionButton.module.css"
import {useDispatch} from "react-redux";
import {setIsAnimation} from "../../redux/AnimationSlice.js";

function ChangeDimensionButton() {

    const dispatch = useDispatch();

    function handleDimensionChange() {
        dispatch(setIsAnimation(true));
    }

    return (
        <button className={`${styles.button} button`} onClick={handleDimensionChange}>
            Сменить измерение
        </button>
    );
}

export default ChangeDimensionButton;
