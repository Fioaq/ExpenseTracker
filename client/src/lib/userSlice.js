import { createSlice } from "@reduxjs/toolkit";

// Define el estado inicial del slice
const initialState = {
    value: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
         // Define un reducer llamado setUserState que actualiza el valor del estado con el payload de la acción
        setUserState: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Exporta un selector de Redux que selecciona el valor del usuario del estado global
export const selectUser = (state) => state.user.value
// Exporta la acción setUserState, creada automáticamente por createSlice
export const { setUserState } = userSlice.actions;
// Exporta el reducer creado por createSlice, que maneja las acciones definidas en el slice
export default userSlice.reducer;
