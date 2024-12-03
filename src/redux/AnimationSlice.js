import {createSlice} from '@reduxjs/toolkit'

const animationSlice = createSlice({
    name: 'animation',
    initialState: {
        isAnimation: false,
        showGif: false
    },
    reducers: {
        setIsAnimation: (state, action) => {
            state.isAnimation = action.payload;
        },
        setShowGif: (state, action) => {
            state.showGif = action.payload;
        }
    }
})

export const {setIsAnimation, setShowGif} = animationSlice.actions;
export default animationSlice;
