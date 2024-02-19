"use client"
import { deleteTransaction, findUser } from "@/app/api/route";
import TransactionForm from "@/components/forms/transaction/AddTransactionForm";
import { selectUser } from "@/lib/features/users/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { iconCategories } from "@/util/transactionCat";
import { Box, Button, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import { Fragment, useEffect, useState } from "react";
import style from "../transactionList/page.module.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from "dayjs";
import AddTransactionForm from "@/components/forms/transaction/AddTransactionForm";
import EditTransactionForm from "../forms/transaction/editTransactionForm";

const ExpIncMain = ({ transactionType }) => {
    const user = useAppSelector(selectUser);
    const [transactions, setTransactions] = useState([]);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [transaction, setTransaction] = useState({});

    const getTransactions = async () => {
        try {
            const result = await findUser(user._id);
            const filteredTransactions = result.transactions.filter((item) => item.transactionType == transactionType);
            // Ordenar las transacciones por fecha de manera descendente
            const sortedTransactions = filteredTransactions.sort((a, b) => {
                return dayjs(b.date) - dayjs(a.date);
            });
            setTransactions(sortedTransactions);
            console.log(sortedTransactions);
        } catch (error) {
            console.log(error);
        }
    };

    const handleColor = () => {
        return transactionType == "ingreso" ? "#727B54" : "#AC4F4F"
    };

    const formatoConPuntos= (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleTotal = () => {
        let total = 0;
        transactions.forEach((transaction) => {
            total += transaction.amount;
        });
        return formatoConPuntos(total);
    }

    useEffect(() => {
        getTransactions();
    }, []);

    const handleDelete= async (id) => {
        try {
            const result = await deleteTransaction(id);
            console.log(result);
            getTransactions();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCompleted = () => {
        getTransactions();
    };

    const handleClickOpenNew = () => {
        setOpen(true);
    };

    const handleClickOpenEdit = (data) => {
        setTransaction(data);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenEdit(false);
    };


    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            backgroundColor: "#F7F6F4",
                            border: "1px solid #E0E0E0",
                            borderRadius: 3,
                            p: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "10vh"
                        }}>
                        <Typography variant="h4" sx={{ color: "#414833" }}>
                            Total de {transactionType}s:
                        </Typography>
                        <Typography variant="h4" sx={{ color: `${handleColor()}`, ml: 1 }}>
                            {transactionType == "ingreso" ? `+ ` : `- `}
                            {handleTotal()}<AttachMoneyIcon />
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        className={style.container}
                        maxHeight={"76vh"}
                        sx={{
                            backgroundColor: "#F7F6F4",
                            border: "1px solid #E0E0E0",
                            borderRadius: 3,
                            p: 2,
                            overflow: "auto"
                        }}>
                        {transactions.map((transaction, idx) => {
                            return (
                                <ListItem
                                    key={idx}
                                    sx={{ my: 1, "&:hover": { backgroundColor: "#a4ac861c" } }}
                                    secondaryAction={
                                        <Fragment>
                                            <IconButton onClick={() => handleClickOpenEdit(transaction)} edge="end" aria-label="edit" sx={{ mr: 1, color: "#8E9574" }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(transaction._id)} edge="end" aria-label="delete" sx={{ color: "#8E9574" }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Fragment>
                                    }
                                >
                                    <ListItemAvatar>
                                        {iconCategories(transaction.category)}
                                    </ListItemAvatar>
                                    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                        <Typography variant="subtitle1" sx={{ color: "#53443B" }}>
                                            {transaction.title}
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", color: `${handleColor()}` }}>
                                            <Typography fontSize={"1.1rem"}>
                                                {transaction.transactionType == "ingreso" ? "+" : "-"}
                                            </Typography>
                                            <AttachMoneyIcon fontSize="small" />
                                            <Typography sx={{ ml: -0.5 }}>
                                                {formatoConPuntos(transaction.amount)}
                                            </Typography>
                                            <CalendarMonthIcon sx={{ ml: 2 }} fontSize="small" />
                                            <Typography fontSize={"0.96rem"}>
                                                {dayjs(transaction.date).format('DD/MM/YYYY')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </ListItem>

                            )
                        })}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            backgroundColor: "#F7F6F4",
                            border: "1px solid #E0E0E0",
                            borderRadius: 3,
                            p: 2
                        }}>
                        <Typography variant="h4">GRAPHIC</Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                variant="outlined"
                                endIcon={<AddIcon />}
                                onClick={handleClickOpenNew}
                                sx={{
                                    "& .MuiButton-endIcon": {
                                        margin: "0px",
                                        ml: 0.4, mb: 0.3
                                    },
                                    color: "#6C584C",
                                    borderColor: "#A4AC86",
                                    fontWeight: "bold",
                                    backgroundColor: "#a4ac863f",
                                    "&: hover": {
                                        backgroundColor: "#a4ac8665",
                                        borderColor: "#A4AC86"
                                    }
                                }}>
                                Agregar {transactionType}
                            </Button>
                            <AddTransactionForm
                                transactionName={transactionType}
                                open={open}
                                onClose={handleClose}
                                completed={handleCompleted}
                            />
                            <EditTransactionForm
                                transaction={transaction}
                                open={openEdit}
                                onClose={handleClose}
                                completed={handleCompleted}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ExpIncMain;