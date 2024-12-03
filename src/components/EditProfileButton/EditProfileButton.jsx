import styles from "./EditProfileButton.module.css"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function EditProfileButton() {

    const navigate = useNavigate();

    function handleEditProfileClick() {
        navigate("/profile");
    }

    const avatar = useSelector(state => state.userReducer.avatar);

    return (
        <img src={avatar} alt="аватарка" className={`${styles.button}`} onClick={handleEditProfileClick}/>
    );
}

export default EditProfileButton;
