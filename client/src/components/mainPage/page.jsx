"use client"
import { findUser } from "@/app/api/route";
import { selectUser } from "@/lib/features/users/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { iconCategories } from "@/util/transactionCat";
import { Box, Button, Grid, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MessageIcon from '@mui/icons-material/Message';
import { useRouter } from "next/navigation";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const boxSty = {
    backgroundColor: "#F7F6F4",
    border: "1px solid #E0E0E0",
    borderRadius: 3,
    p: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "7vh"
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#a4ac8665',
        },
    },
});

const MainPage = () => {
    const user = useAppSelector(selectUser);
    const router = useRouter();
    const [transactions, setTransactions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        // Filtrar transacciones cuando cambie la fecha seleccionada
        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = dayjs(transaction.date);
            return transactionDate.month() === selectedDate.month() && transactionDate.year() === selectedDate.year();
        });
        processTransactions(filteredTransactions);
    }, [selectedDate]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const getTransactions = async () => {
        try {
            const result = await findUser(user._id);
            const sortedTransactions = result.transactions.sort((a, b) => dayjs(b.date) - dayjs(a.date));
            setTransactions(sortedTransactions);
            console.log(result.transactions);
        } catch (error) {
            console.log(error);
        }
    };

    const formatoConPuntos = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const getDatesOfMonth = (selectedDate) => {
        const firstDayOfMonth = selectedDate.startOf('month');
        const lastDayOfMonth = selectedDate.endOf('month');
        const dates = [];
        let currentDay = firstDayOfMonth;
        while (currentDay.isBefore(lastDayOfMonth, 'day')) {
            dates.push(currentDay.format('YYYY-MM-DD'));
            currentDay = currentDay.add(1, 'day');
        }
        return dates;
    };

    const processTransactions = (transactions) => {
        const datesOfMonth = getDatesOfMonth(selectedDate);
        const data = datesOfMonth.map(date => {
            const transactionsOnDate = transactions.filter(transaction => dayjs(transaction.date).format('YYYY-MM-DD') === date);
            const ingresos = transactionsOnDate.filter(transaction => transaction.transactionType === 'ingreso').reduce((sum, transaction) => sum + transaction.amount, 0);
            const gastos = transactionsOnDate.filter(transaction => transaction.transactionType === 'gasto').reduce((sum, transaction) => sum + transaction.amount, 0);
            return { date, ingresos, gastos };
        });
        
        return data;
    };
    const data = processTransactions(transactions);

    const handleIncExp = (type) => {
        const totalIngresos = data.reduce((acc, item) => acc + item.ingresos, 0);
        const totalEgresos = data.reduce((acc, item) => acc + item.gastos, 0);
        if (type == "ingresos") {
            return formatoConPuntos(totalIngresos);
        } else if (type == "egresos") {
            return formatoConPuntos(totalEgresos);
        } else {
            return formatoConPuntos(totalIngresos - totalEgresos);
        }
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Box sx={boxSty}>
                    <Typography variant="h4" sx={{ fontSize: "2rem", color: "#5C4C41", fontWeight: 400, letterSpacing: 0.3 }}>
                        Balance: {handleIncExp("balance")}<AttachMoneyIcon />
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{
                    backgroundColor: "#F7F6F4",
                    border: "1px solid #E0E0E0",
                    borderRadius: 3,
                    p: 1,
                }}>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: data.map(item => item.date) }]}
                        series={[
                            { data: data.map(item => item.ingresos), label: "Ingresos", color: "#727B54" },
                            { data: data.map(item => item.gastos), label: "Gastos", color: "#AC4F4F" }
                        ]}
                        width={800}
                        height={340}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{
                    backgroundColor: "#F7F6F4",
                    border: "1px solid #E0E0E0",
                    borderRadius: 3,
                    p: 2.5,
                }}>
                    <Typography variant="h5" sx={{ color: "#5C4C41", ml: 1 }}>Transacciones recientes</Typography>
                    {transactions
                        .slice(0, 3) // Tomar solo las primeras 4 transacciones
                        .map((transaction, idx) => (
                            <ListItem
                                key={idx}
                                sx={{
                                    my: 1,
                                    "&:hover": {
                                        backgroundColor: "#a4ac863f"
                                    },
                                    backgroundColor: "#EDEBE6",
                                    borderRadius: 2
                                }}
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
                                    <Typography variant="subtitle1" sx={{ fontSize: "1.05rem", color: `${transaction.transactionType == "ingreso" ? "#727B54" : "#AC4F4F"}` }}>
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
                        ))}
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => router.push("/transactions")}
                        sx={{
                            color: "#6C584C",
                            mt: 1,
                            borderColor: "#A4AC86",
                            fontWeight: "bold",
                            backgroundColor: "#a4ac863f",
                            "&: hover": {
                                backgroundColor: "#a4ac8665",
                                borderColor: "#A4AC86"
                            }
                        }}>
                        Ver más
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{
                    backgroundColor: "#F7F6F4",
                    border: "1px solid #E0E0E0",
                    borderRadius: 3,
                    px: 15,
                    height: "37vh"
                }}>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                            <StaticDatePicker
                                defaultValue={dayjs()}
                                views={['month', 'year']}
                                orientation="landscape"
                                slotProps={{ actionBar: { actions: [] } }}
                                localeText={{ toolbarTitle: 'Fecha seleccionada' }}
                                sx={{
                                    backgroundColor: "#F7F6F4",
                                    mt: 2, color: "#5C4C41",
                                }}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </ThemeProvider>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={boxSty}>
                    <Typography variant="h4" sx={{ fontSize: "2rem", color: "#727B54", fontWeight: 400, letterSpacing: 0.3 }}>
                        Total de ingresos: + {handleIncExp("ingresos")}<AttachMoneyIcon />
                    </Typography>
                </Box>
                <Box sx={boxSty} marginTop={2}>
                    <Typography variant="h4" sx={{ fontSize: "2rem", color: "#AC4F4F", fontWeight: 400, letterSpacing: 0.3 }}>
                        Total de gastos: - {handleIncExp("egresos")}<AttachMoneyIcon />
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
};

export default MainPage;