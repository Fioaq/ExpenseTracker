"use client"
import { deleteTransaction, findUser } from "@/app/api/route";
import { selectUser } from "@/lib/features/users/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { allCategories, expensesCat, getCategoryColor, iconCategories, incomeCat } from "@/util/transactionCat";
import { Box, Button, Grid, IconButton, ListItem, ListItemAvatar, MenuItem, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Fragment, useEffect, useState } from "react";
import style from "../transactionList/page.module.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from "dayjs";
import AddTransactionForm from "@/components/forms/transaction/AddTransactionForm";
import EditTransactionForm from "../forms/transaction/editTransactionForm";
import { DatePicker } from "@mui/x-date-pickers";
import { PieChart } from "@mui/x-charts";
import Swal from "sweetalert2";

const expCategories = expensesCat();
const incCategories = incomeCat();
const startOfMonth = dayjs().startOf('month');
const endOfMonth = dayjs().endOf('month');

const ExpIncMain = ({ transactionType }) => {
    const user = useAppSelector(selectUser);
    const [transactions, setTransactions] = useState([]);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [transaction, setTransaction] = useState({});
    const [titleSearch, setTitleSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");
    const [dateSearch, setDateSearch] = useState(null);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [startDate, setStartDate] = useState(startOfMonth);
    const [endDate, setEndDate] = useState(endOfMonth);
    const categories = transactionType == "ingreso" ? incCategories : expCategories;


    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        filterTransactions();
    }, [titleSearch, categorySearch, dateSearch, transactions]);

    const getTransactions = async () => {
        try {
            const result = await findUser(user._id);
            const filter = result.transactions.filter((item) => item.transactionType == transactionType);
            // Ordenar las transacciones por fecha de manera descendente
            const sortedTransactions = filter.sort((a, b) => {
                return dayjs(b.date) - dayjs(a.date);
            });
            setTransactions(sortedTransactions);
            console.log(sortedTransactions);
        } catch (error) {
            console.log(error);
        }
    };

    const filterTransactions = () => {
        const filtered = transactions.filter((transaction) =>
            transaction.title.toLowerCase().includes(titleSearch.toLowerCase()) &&
            (categorySearch === "Todas las categorías" || transaction.category.toLowerCase().includes(categorySearch.toLowerCase())) &&
            (dateSearch ? dayjs(transaction.date).isSame(dateSearch, 'day') : true)
        );
        setFilteredTransactions(filtered);
    };


    const handleColor = () => {
        return transactionType == "ingreso" ? "#727B54" : "#AC4F4F"
    };

    const formatoConPuntos = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleTotal = () => {
        let total = 0;
        const currentMonthTransactions = transactions.filter((transaction) =>
            dayjs(transaction.date).isSame(dayjs(), 'month')
        );
        currentMonthTransactions.forEach((transaction) => {
            total += transaction.amount;
        });
        return formatoConPuntos(total);
    }

    const handleDelete = async (id) => {
        try {
            const result = await deleteTransaction(id);
            console.log(result);
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "#EAE8E3",
                position: "bottom",
                color: "#EAE8E3",
                title: `${transactionType == "ingreso" ? "Ingreso" : "Gasto"} eliminado correctamente.`,
                background: "#87AA73",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            });
            getTransactions();
        } catch (error) {
            console.log(error);
        }
    }

    const getCategoryCounts = (transactions) => {
        const categoryCounts = {};
        transactions.forEach((transaction) => {
            const category = transaction.category;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        return categoryCounts;
    };

    const prepareChartData = (transactions) => {
        let newFilteredTransactions = transactions;

        if (startDate && endDate) {
            newFilteredTransactions = transactions.filter((transaction) =>
                dayjs(transaction.date).isAfter(startDate) &&
                dayjs(transaction.date).isBefore(endDate)
            );
        }

        const categoryCounts = getCategoryCounts(newFilteredTransactions);
        const chartData = Object.keys(categoryCounts).map((category, index) => ({
            id: index,
            label: category,
            value: categoryCounts[category],
            color: `${getCategoryColor(category)}`
        }));
        return chartData;
    };



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
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Button
                                    variant="outlined"
                                    endIcon={<AddIcon />}
                                    fullWidth
                                    onClick={handleClickOpenNew}
                                    sx={{
                                        "& .MuiButton-endIcon": {
                                            margin: "0px",
                                            ml: 0.4, mb: 0.3, p: 0.3
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
                                    Añadir {transactionType}
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
                            </Grid>
                            <Grid item xs={12} md={3}>
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
                            <Grid item xs={12} md={3}>
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
                            <Grid item xs={12} md={3}>
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
                        </Grid >
                        {filteredTransactions.map((transaction, idx) => {
                            return (
                                <ListItem
                                    key={idx}
                                    sx={{ my: 2, "&:hover": { backgroundColor: "#a4ac861c" } }}
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
                            pt: 4
                        }}>
                        <Box sx={{ mb: 10 }}>
                            <PieChart
                                series={[{ data: prepareChartData(transactions) }]}
                                width={660}
                                height={300}
                                slotProps={{
                                    legend: {
                                        direction: 'column',
                                        position: { vertical: 'middle', horizontal: 'right' },
                                        padding: 0,
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ px: 5, pb: 5, display: "flex", justifyContent: "center", gap: 3 }}>
                            <DatePicker
                                label="Fecha Inicio"
                                inputVariant="outlined"
                                value={startDate}
                                slotProps={{ textField: { size: 'small', color: "success" } }}
                                sx={{
                                    borderColor: "#A4AC86",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#A4AC86",
                                        backgroundColor: '#a4ac863f'
                                    },
                                }}
                                onChange={(date) => setStartDate(date)}
                                format="YYYY/MM/DD"
                            />
                            <DatePicker
                                label="Fecha Fin"
                                inputVariant="outlined"
                                value={endDate}
                                slotProps={{ textField: { size: 'small', color: "success" } }}
                                sx={{
                                    borderColor: "#A4AC86",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#A4AC86",
                                        backgroundColor: '#a4ac863f'
                                    },
                                }}
                                onChange={(date) => setEndDate(date)}
                                format="YYYY/MM/DD"
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ExpIncMain;