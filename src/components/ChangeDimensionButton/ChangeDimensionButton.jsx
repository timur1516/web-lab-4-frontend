import {useDispatch} from "react-redux";
import {setIsAnimation} from "../../redux/AnimationSlice.js";

function ChangeDimensionButton() {

    const dispatch = useDispatch();

    function handleDimensionChange() {
        dispatch(setIsAnimation(true));
    }

    return (
        <button className={"button"} onClick={handleDimensionChange}>
            <span className="lg-view">Сменить измерение</span>
            <span className="sm-view">꩜</span>
        </button>
    );
}

export default ChangeDimensionButton;
