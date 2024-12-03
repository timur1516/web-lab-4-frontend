import {useRef} from "react";
import {Cropper} from "react-cropper";
import 'cropperjs/dist/cropper.css';
import "./cropper.css"
import styles from "./ImageCrop.module.css";

function ImageCrop({uploadedImage, croppedImageHandler}) {
    const cropperRef = useRef(null);

    function handleCrop() {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const base64 = cropper.getCroppedCanvas().toDataURL();
            croppedImageHandler(base64);
        }
    }

    return (
        <div className={styles["cropper-container"]}>
            <Cropper
                style={{height: 300, width: 300}}
                initialAspectRatio={1}
                src={uploadedImage}
                ref={cropperRef}
                viewMode={1}
                aspectRatio={1}
                guides={false}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={true}
                responsive={true}
                checkOrientation={false}
            />
            <button className={"button"} onClick={handleCrop}>
                Обновить фото
            </button>
        </div>
    );
}

export default ImageCrop;
