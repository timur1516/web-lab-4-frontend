import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: "guest",
        firstName: "guest",
        lastName: "guest",
        avatar: null
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        }
    }
})

export const {setUsername, setAvatar, setFirstName, setLastName} = userSlice.actions;
export default userSlice;
