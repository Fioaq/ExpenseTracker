import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: "",
        firstName: "",
        lastName: "",
    },
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;

        },
        clearUser: state => {
            state._id = "";
            state.firstName = "";
            state.lastName = "";
        },

    }
})

export const { setUser, clearUser } = userSlice.actions
export const selectUser = (state) => state.user

export default userSlice.reducer