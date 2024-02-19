"use client"
import { findUser } from "@/app/api/route";
import { selectUser } from "@/lib/features/users/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { Box, Divider, Grid, IconButton, List, ListItem, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MessageIcon from '@mui/icons-material/Message';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import dayjs from "dayjs";
import style from "./page.module.css";
import { iconCategories } from "@/util/transactionCat";

const TransactionList = () => {
    const user = useAppSelector(selectUser);
    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        try {
            const result = await findUser(user._id);
            setTransactions(result.transactions);
            console.log(result.transactions);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);

    const formatoConPuntos = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Función para formatear la fecha
    const formatDate = (date) => {
        const today = dayjs().subtract(1, 'day');
        const transactionDate = dayjs(date);

        // Comprueba si la fecha es hoy
        if (transactionDate.isSame(today, 'day')) {
            return "Hoy";
        } else if (transactionDate.isSame(today.subtract(1, 'day'), 'day')) {
            // Comprueba si la fecha es ayer
            return "Ayer";
        } else {
            // Devuelve la fecha en formato de cadena
            return transactionDate.format('DD/MM/YYYY');
        }
    };

    // Agrupa las transacciones por fecha
    const groupedTransactions = transactions.reduce((acc, transaction) => {
        const dateKey = formatDate(transaction.date);

        // Si la fecha no existe en el acumulador, crea un nuevo arreglo para esa fecha
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }

        // Agrega la transacción al arreglo correspondiente a la fecha
        acc[dateKey].push(transaction);

        return acc;
    }, {});


    return (
        <Grid
            item xs={12}
            md={6}
            className={style.container}
            sx={{
                height: "calc(100% - 90px)",
                backgroundColor: "#fff",
                border: "1px solid #E0E0E0",
                borderRadius: 3,
                px: 4,
                margin: 2,
                overflow: "auto"
            }}>
            <List>
                {/*Convierte el objeto groupedTransactions en un array de pares clave-valor, donde cada par es un array con dos elementos: 
                        la clave (que en este caso sería la fecha formateada) y el valor (que sería un array de transacciones correspondientes a esa fecha)*/}
                {Object.entries(groupedTransactions).map(([date, transactions]) => (
                    <Fragment key={date}>
                        <Typography variant="h6" sx={{ my: 1 }}>{date}</Typography>
                        {transactions.map((transaction, idx) => (
                            <Fragment>
                                <ListItem
                                    key={idx}
                                    sx={{ my: 1, "&:hover": { backgroundColor: "#a4ac861c" } }}
                                    secondaryAction={
                                        <Box sx={{ display: "flex", alignItems: "center", color: `${transaction.transactionType == "ingreso" ? "#727B54" : "#AC4F4F"}` }}>
                                            <Typography fontSize={"1.1rem"}>
                                                {transaction.transactionType == "ingreso" ? "+" : "-"}
                                            </Typography>
                                            <AttachMoneyIcon fontSize="small" />
                                            <Typography sx={{ ml: -0.5, fontSize: "1.1rem" }}>
                                                {formatoConPuntos(transaction.amount)}
                                            </Typography>
                                        </Box>
                                    }
                                >
                                    <ListItemAvatar>
                                        {iconCategories(transaction.category)}
                                    </ListItemAvatar>
                                    <Box sx={{ display: "flex", flexDirection: "column", color: "#53443B" }}>
                                        <Typography variant="subtitle1" sx={{ fontSize: "1.05rem" }}>
                                            {transaction.title}
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <MessageIcon fontSize="small" sx={{ color: "#656D4A" }} />
                                            <Typography sx={{ ml: 1 }}>
                                                {transaction.description == "" ? "..." : transaction.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </ListItem>
                                <Divider variant="middle" />
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
            </List>
        </Grid>
    )
};

export default TransactionList;