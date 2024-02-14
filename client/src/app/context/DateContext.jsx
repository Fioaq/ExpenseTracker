"use client"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export const LocationProvider = ({ children }) => {
    // Retorna el proveedor de contexto con el valor del estado y la función para actualizarlo
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
    );
};
