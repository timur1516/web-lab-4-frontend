import {createSlice} from '@reduxjs/toolkit'

const modalWindowSlice = createSlice({
    name: 'modalWindow',
    initialState: {
        showModalWindow: false
    },
    reducers: {
        setShowModalWindow: (state, action) => {
            state.showModalWindow = action.payload;
        }
    }
})

export const {setShowModalWindow} = modalWindowSlice.actions;
export default modalWindowSlice;
