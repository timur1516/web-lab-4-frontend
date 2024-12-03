import {configureStore} from "@reduxjs/toolkit";
import radiusSlice from "./RadiusSlice.js";
import historySlice from "./HistorySlice.js";
import animationSlice from "./AnimationSlice.js";
import modalWindowSlice from "./ModalWindowSlice.js";
import userSlice from "./UserSlice.js";

const store = configureStore({
    reducer: {
        radiusReducer: radiusSlice.reducer,
        historyReducer: historySlice.reducer,
        animationReducer: animationSlice.reducer,
        modalWindowReducer: modalWindowSlice.reducer,
        userReducer: userSlice.reducer,
    },
});

export default store;
