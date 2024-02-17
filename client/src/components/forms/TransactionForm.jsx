'use client'
import { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { findUser, newTransaction } from '@/app/api/route';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { MenuItem, Typography } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';
import { selectUser } from '@/lib/features/users/userSlice';


const TransactionForm = ({ transactionName = "" }) => {
    const user = useAppSelector(selectUser);
    const currentDate = dayjs();
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get('title'),
            amount: formData.get('amount'),
            category: formData.get('category'),
            date: formData.get('date'),
            description: formData.get('date'),
            transactionType: transactionName,
            user: user._id
        }
        try {
            const result = await newTransaction(data);
            console.log(result);
        } catch (error) {
            console.log(error);
            const valErrors = error.response.data.error.errors;
            if (error.response?.data?.error?.errors) {
                setError({
                    title: valErrors.title?.message ? valErrors.title?.message : "",
                    amount: valErrors.amount?.message ? valErrors.amount?.message : "",
                    category: valErrors.category?.message ? valErrors.category?.message : "",
                    date: valErrors.date?.message ? valErrors.date?.message : "",
                    description: valErrors.description?.message ? valErrors.description?.message : ""
                });
            }
        }
    };

    const handleCategories = async () => {
        try {
            const result = await findUser(user._id);
            if (transactionName == "gasto") {
                setCategorias(result.expensesCat);
            } else {
                setCategorias(result.incomeCat);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleCategories();
    }, [])


    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={1}>
                        <Typography>Agregar {transactionName}</Typography>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Título"
                                name="title"
                                autoComplete="title"
                                error={error.title ? true : false}
                                helperText={error.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="amount"
                                label="Monto"
                                type="number"
                                id="amount"
                                autoComplete="amount"
                                error={error.amount ? true : false}
                                helperText={error.amount}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                label="Categoría"
                                name="category"
                                id="category"
                                defaultValue=""
                                select
                                required
                                fullWidth
                                sx={{ mr: 1, mt: 2 }}
                                error={error.category ? true : false}
                                helperText={error.category}
                            >
                                {categorias.map((item, idx) => {
                                    return <MenuItem key={idx} value={item}>{item}</MenuItem>
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <DatePicker
                                format="YYYY-MM-DD"
                                fullWidth
                                name="date"
                                label="Fecha *"
                                id="date"
                                defaultValue={currentDate}
                                sx={{ ml: 1, mt: 2 }}
                                error={error.date ? true : false}
                                helperText={error.date}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="description"
                                label="Descripción"
                                id="description"
                                autoComplete="description"
                                multiline
                                rows={4}
                                error={error.description ? true : false}
                                helperText={error.description}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Agregar {transactionName}
                    </Button>
                </Box>
            </Container>
        </Fragment >
    );

}

export default TransactionForm;
