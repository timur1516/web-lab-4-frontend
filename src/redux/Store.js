import {configureStore} from "@reduxjs/toolkit";
import radiusSlice from "./RadiusSlice.js";
import historySlice from "./HistorySlice.js";
import animationSlice from "./AnimationSlice.js";

const store = configureStore({
    reducer: {
        radiusReducer: radiusSlice.reducer,
        historyReducer: historySlice.reducer,
        animationReducer: animationSlice.reducer
    },
});

export default store;
