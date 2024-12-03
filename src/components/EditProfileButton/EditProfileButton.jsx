import styles from "./EditProfileButton.module.css"
import {useDispatch} from "react-redux";
import {setIsAnimation} from "../../redux/AnimationSlice.js";
import {setShowModalWindow} from "../../redux/ModalWindowSlice.js";

function EditProfileButton() {

    const dispatch = useDispatch();

    function handleEditProfileClick() {
        dispatch(setShowModalWindow(true));
    }

    return (
        <button className={`${styles.button} button`} onClick={handleEditProfileClick}>
            АВАТАРКА
        </button>
    );
}

export default EditProfileButton;
