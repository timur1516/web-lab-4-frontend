import {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sendAvatarToServer} from "../../../util/AvatarUtil.js";
import {setAvatar} from "../../../redux/UserSlice.js";
import styles from "./AvatarForm.module.css"
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import {setShowModalWindow} from "../../../redux/ModalWindowSlice.js";
import Overlay from "../../Overlay/Overlay.jsx";
import ModalWindow from "../../ModalWindow/ModalWindow.jsx";
import ImageCrop from "../../ImageCrop/ImageCrop.jsx";

const AvatarForm = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [uploadedImage, setUploadedImage] = useState("");

    const avatar = useSelector(state => state.userReducer.avatar);

    const fileInputRef = useRef(null);

    const isShowModal = useSelector(state => state.modalWindowReducer.showModalWindow);

    function handleAvatarUploadClick() {
        fileInputRef.current.click();
    }

    const file2Base64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? reader.result.toString() : '');
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 1024 * 1024) {
            setErrorMessage("Максимальный размер файла: 1Мб");
            return;
        }
        file2Base64(file)
            .then((result) => {
                setUploadedImage(result);
            });
        e.target.value = "";
        dispatch(setShowModalWindow(true));
    };
    const dispatch = useDispatch();

    function handleUpload(croppedImage) {
        const base64 = croppedImage.split(",")[1];
        const type = croppedImage.split(",")[0].split('/')[1].split(';')[0];
        sendAvatarToServer(base64, type);
        dispatch(setAvatar(croppedImage));
        dispatch(setShowModalWindow(false));
    }

    return (
        <>
            <div className={styles["form-container"]}>
                <ErrorMessage error={errorMessage}/>
                <img alt="аватарка" className={styles["avatar"]} src={avatar}/>
                <button onClick={handleAvatarUploadClick} className="button">
                    Загрузить фото
                </button>
                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    accept="image/*"/>
            </div>
            {isShowModal &&
                <Overlay>
                    <ModalWindow>
                        <ImageCrop uploadedImage={uploadedImage} croppedImageHandler={handleUpload}/>
                    </ModalWindow>
                </Overlay>
            }
        </>
    );
};

export default AvatarForm;
