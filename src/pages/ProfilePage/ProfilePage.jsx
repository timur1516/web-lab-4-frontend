import Header from "../../components/Layout/Header.jsx";
import ContentContainer from "../../components/Layout/ContentContainer.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import styles from "./ProfilePge.module.css"
import EditProfileForm from "../../components/Form/EditProfileForm/EditProfileForm.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AvatarForm from "../../components/Form/AvatarForm/AvatarForm.jsx";
import {useEffect} from "react";
import {loadUserData} from "../../util/ServerDataLoadUtil.js";
import {switchTheme} from "../../util/ThemeUtil.js";

function ProfilePage() {
    const navigate = useNavigate();
    const isDataLoaded = useSelector(state => state.historyReducer.isDataLoaded);

    function handleClose() {
        navigate("/main");
    }

    const dispatch = useDispatch();

    useEffect(() => {
        loadUserData(dispatch);
    }, []);

    if(!isDataLoaded) {
        return (<></>);
    }

    return (
        <>
            <Header/>
            <ContentContainer>
                <div className={styles["wrapper"]}>
                    <div className={styles["edit-profile-container"]}>
                        <div className={styles["form-container"]}>
                            <div className={styles["form-header-container"]}>
                                <span>Изменение профиля</span>
                            </div>
                            <EditProfileForm/>
                            <button onClick={handleClose} className="button">
                                На главную
                            </button>
                        </div>
                        <AvatarForm/>
                    </div>
                </div>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default ProfilePage;
