import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

//Define una función makeStore que retorna un nuevo almacén/store para cada solicitud
export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer
        }
    })
}