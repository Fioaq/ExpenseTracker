'use client'
import { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { login } from '@/app/api/route';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { MenuItem } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';
import { selectUser } from '@/lib/userSlice';


const TransactionForm = ({ transactionName = "" }) => {
    const user = useAppSelector(selectUser);
    const currentDate = dayjs();
    const [categorias, setCategorias] = useState(10);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get('title'),
            amount: formData.get('amount'),
            category: formData.get('category'),
            date: formData.get('date'),
            description: formData.get('date')
        }
        try {
            const result = await login(data);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Título"
                                name="title"
                                autoComplete="title"
                                autoFocus
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
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                label="Categoría"
                                name="category"
                                id="category"
                                value={categorias}
                                onChange={(e) => setCategorias(e.target.value)}
                                select
                                required
                                fullWidth
                                sx={{ mr: 1, mt: 2 }}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <DatePicker
                                format="DD-MM-YYYY"
                                fullWidth
                                name="date"
                                label="Fecha *"
                                id="date"
                                defaultValue={currentDate}
                                sx={{ ml: 1, mt: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Descripción"
                                id="description"
                                autoComplete="description"
                                multiline
                                rows={4}
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
