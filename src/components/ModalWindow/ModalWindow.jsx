import styles from './ModalWindow.module.css';
import {setShowModalWindow} from "../../redux/ModalWindowSlice.js";
import {useDispatch} from "react-redux";

function ModalWindow({children}) {

    const dispatch = useDispatch();

   function handleClose(){
       dispatch(setShowModalWindow(false));
   }

    return (
        <div className={styles["modal-window"]}>
            {children}
            <button onClick={handleClose} className="button">
                Закрыть
            </button>
        </div>
    );
}

export default ModalWindow;
