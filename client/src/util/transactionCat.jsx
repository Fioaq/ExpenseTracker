import { Fragment } from 'react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { Avatar } from '@mui/material';

export const iconCategories = (category) => {
    const icons = {
        "Supermercado": <Avatar sx={{ bgcolor: "#F1B4BD", color: "#fff" }} ><LocalGroceryStoreOutlinedIcon /></Avatar>,
        "Transporte": <Avatar sx={{ bgcolor: "#9FC4D0", color: "#fff" }} ><DirectionsBusFilledOutlinedIcon /></Avatar>,
        "Vivienda": <Avatar sx={{ bgcolor: "#DBCC78", color: "#fff" }} ><HouseOutlinedIcon /></Avatar>,
        "Salud": <Avatar sx={{ bgcolor: "#87BB87", color: "#fff" }} ><MedicalServicesOutlinedIcon /></Avatar>,
        "Educación": <Avatar sx={{ bgcolor: "#E79778", color: "#fff" }} ><SchoolOutlinedIcon /></Avatar>,
        "Entretenimiento": <Avatar sx={{ bgcolor: "#7FB4D5", color: "#fff" }} ><CasinoOutlinedIcon /></Avatar>,
        "Vestimenta": <Avatar sx={{ bgcolor: "#C66B99", color: "#fff" }} ><CheckroomOutlinedIcon /></Avatar>,
        "Servicios públicos": <Avatar sx={{ bgcolor: "#D26C5A", color: "#fff" }} ><FeedOutlinedIcon /></Avatar>,
        "Viajes": <Avatar sx={{ bgcolor: "#55A09C", color: "#fff" }} ><PublicOutlinedIcon /></Avatar>,
        "Regalos": <Avatar sx={{ bgcolor: "#8D76BB", color: "#fff" }} ><CardGiftcardIcon /></Avatar>,
        "Salario": <Avatar sx={{ bgcolor: "#E3B053", color: "#fff" }} ><CardTravelIcon /></Avatar>,
        "Freelance": <Avatar sx={{ bgcolor: "#5A8E6A", color: "#fff" }} ><PaymentsOutlinedIcon /></Avatar>,
        "Inversiones": <Avatar sx={{ bgcolor: "#CD5C5C", color: "#fff" }} ><TrendingUpOutlinedIcon /></Avatar>,
        "Otros": <Avatar sx={{ bgcolor: "#A7B2C1", color: "#fff" }} ><PendingOutlinedIcon /></Avatar>,
    };

    return icons[category] || <Fragment />;
};

export const getCategoryColor = (category) => {
    const colors = {
        "Supermercado": "#F1B4BD",
        "Transporte": "#9FC4D0",
        "Vivienda": "#DBCC78",
        "Salud": "#87BB87",
        "Educación": "#E79778",
        "Entretenimiento": "#7FB4D5",
        "Vestimenta": "#C66B99",
        "Servicios públicos": "#D26C5A",
        "Viajes": "#55A09C",
        "Regalos": "#8D76BB",
        "Salario": "#E3B053",
        "Freelance": "#5A8E6A",
        "Inversiones": "#CD5C5C",
        "Otros": "#A7B2C1",
    };

    return colors[category] || "#F6F6F6";
};


export const expensesCat= () =>{
    return(["Supermercado", "Transporte", "Vivienda", "Salud", "Educación", "Entretenimiento", "Vestimenta", "Servicios públicos", "Viajes", "Regalos", "Otros"])
}

export const incomeCat= () =>{
    return(["Salario", "Freelance", "Inversiones", "Otros"])
}

export const allCategories= () =>{
    return["Supermercado", "Transporte", "Vivienda", "Salud", "Educación", "Entretenimiento", "Vestimenta", "Servicios públicos", "Viajes", "Regalos", "Sueldo", "Freelance", "Inversiones", "Otros"]
}
