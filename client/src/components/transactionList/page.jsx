"use client"
import { findUser } from "@/app/api/route";
import { selectUser } from "@/lib/features/users/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { Box, Divider, Grid, IconButton, List, ListItem, MenuItem, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MessageIcon from '@mui/icons-material/Message';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import dayjs from "dayjs";
import style from "./page.module.css";
import { allCategories, iconCategories } from "@/util/transactionCat";
import { DatePicker } from "@mui/x-date-pickers";
import SearchIcon from '@mui/icons-material/Search';

const categories = allCategories();

const TransactionList = () => {
    const user = useAppSelector(selectUser);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [titleSearch, setTitleSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");
    const [dateSearch, setDateSearch] = useState(null);


    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        filterTransactions();
    }, [titleSearch, categorySearch, dateSearch, transactions]);

    const getTransactions = async () => {
        try {
            const result = await findUser(user._id);
            setTransactions(result.transactions);
            setFilteredTransactions(result.transactions);
            console.log(result.transactions);
        } catch (error) {
            console.log(error);
        }
    };

    const filterTransactions = () => {
        const filtered = transactions.filter((transaction) =>
            transaction.title.toLowerCase().includes(titleSearch.toLowerCase()) &&
            transaction.category.toLowerCase().includes(categorySearch.toLowerCase()) &&
            (dateSearch ? dayjs(transaction.date).isSame(dateSearch, 'day') : true)
        );
        setFilteredTransactions(filtered);
    };

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
    const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
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
        <Box
            className={style.container}
            sx={{
                height: "calc(100% - 80px)",
                backgroundColor: "#fff",
                border: "1px solid #E0E0E0",
                borderRadius: 3,
                px: 4,
                py: 3,
                margin: 1,
                overflow: "auto"
            }}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            backgroundColor: "#a4ac863f",
                            border: "1px solid #E0E0E0",
                            borderRadius: 3,
                            p: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "7vh"
                        }}>
                        <Typography variant="h4" className={style.robotoMedium} sx={{fontSize: "1.7rem", color: "#5C4C41", fontWeight:400, letterSpacing:0.3 }}>
                            Todas las transacciones
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} lg={2}>
                    <TextField
                        placeholder="Buscar"
                        variant="outlined"
                        size="small"
                        color="success"
                        InputProps={{
                            startAdornment: (
                                <IconButton sx={{ mr: 0.2 }}>
                                    <SearchIcon />
                                </IconButton>
                            )
                        }}
                        sx={{
                            borderColor: "#A4AC86",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#A4AC86",
                                backgroundColor: '#a4ac863f'
                            },
                        }}
                        value={titleSearch}
                        onChange={(e) => setTitleSearch(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={2}>
                    <TextField
                        select
                        fullWidth
                        label="Categoría"
                        variant="outlined"
                        size="small"
                        color="success"
                        sx={{
                            borderColor: "#A4AC86",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#A4AC86",
                                backgroundColor: '#a4ac863f'
                            },
                        }}
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={3} lg={2}>
                    <DatePicker
                        label="Fecha"
                        inputVariant="outlined"
                        value={dateSearch}
                        slotProps={{ textField: { size: 'small', color: "success" } }}
                        sx={{
                            borderColor: "#A4AC86",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#A4AC86",
                                backgroundColor: '#a4ac863f'
                            },
                        }}
                        onChange={(date) => setDateSearch(date)}
                        format="YYYY/MM/DD"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <List sx={{mt: -2}}>
                        {/*Convierte el objeto groupedTransactions en un array de pares clave-valor, donde cada par es un array con dos elementos: 
                        la clave (que en este caso sería la fecha formateada) y el valor (que sería un array de transacciones correspondientes a esa fecha)*/}
                        {Object.entries(groupedTransactions).map(([date, transactions]) => (
                            <Fragment key={date}>
                                <Typography variant="h6" sx={{ my: 1, color: "#5C4C41" }}>{date}</Typography>
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
                                                <Typography variant="subtitle1" className={style.robotoMedium} sx={{ fontSize: "1.05rem", color: `${transaction.transactionType == "ingreso" ? "#727B54" : "#AC4F4F"}` }}>
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
                </Grid >
            </Grid>
        </Box>
    )
};

export default TransactionList;