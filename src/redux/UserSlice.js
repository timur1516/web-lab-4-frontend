import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: "guest",
        avatar: null
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        }
    }
})

export const {setUsername, setAvatar} = userSlice.actions;
export default userSlice;
