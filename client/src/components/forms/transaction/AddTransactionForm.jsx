'use client'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { newTransaction } from '@/app/api/route';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Dialog, DialogTitle, MenuItem } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';
import { selectUser } from '@/lib/features/users/userSlice';
import { expensesCat, incomeCat } from '@/util/transactionCat';
import Swal from 'sweetalert2';

const sty = {
    '& label.Mui-focused': {
        color: '#414833',
        borderColor: '#6C584C'
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#6C584C'
        }
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6C584C",
        backgroundColor: '#a4ac861e'
    },
    borderRadius: '20px'
};


const AddTransactionForm = ({ transactionName, onClose, open, completed }) => {
    const user = useAppSelector(selectUser);
    const currentDate = dayjs();
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        if (transactionName == "ingreso") {
            setCategorias(incomeCat);
        } else {
            setCategorias(expensesCat);
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get('title'),
            amount: formData.get('amount'),
            category: formData.get('category'),
            date: formData.get('date'),
            description: formData.get('description'),
            transactionType: transactionName,
            user: user._id
        }
        try {
            const result = await newTransaction(data);
            completed();
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "#EAE8E3",
                position: "bottom",
                color: "#EAE8E3",
                title: `${transactionName=="ingreso" ? "Ingreso" : "Gasto"} agregado correctamente.`,
                background: "#87AA73",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            });
            onClose();
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

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="xs">
            <CssBaseline />
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 3, backgroundColor: "#EAE8E3" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <DialogTitle variant='h5' sx={{ color: "#414833" }}>Agregar {transactionName}</DialogTitle>
                </Box>
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
                            sx={sty}
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
                            sx={sty}
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
                            sx={{
                                mr: 1, mt: 2,
                                '& label.Mui-focused': {
                                    color: '#414833',
                                    borderColor: '#6C584C'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6C584C'
                                    }
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6C584C",
                                    backgroundColor: '#a4ac861e'
                                },
                                borderRadius: '20px'
                            }}
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
                            maxDate={currentDate}
                            name="date"
                            label="Fecha *"
                            id="date"
                            defaultValue={currentDate}
                            sx={{
                                mr: 1, mt: 2,
                                '& label.Mui-focused': {
                                    color: '#414833',
                                    borderColor: '#6C584C'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6C584C'
                                    }
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6C584C",
                                    backgroundColor: '#a4ac861e'
                                },
                                borderRadius: '20px'
                            }}
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
                            sx={sty}
                            error={error.description ? true : false}
                            helperText={error.description}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        backgroundColor: "#6C584C",
                        '&:hover': {
                            backgroundColor: "#524239",
                        },
                        color: '#E7E5E2',
                        borderRadius: 2
                    }}
                >
                    Agregar {transactionName}
                </Button>
            </Box>
        </Dialog >
    );

}

export default AddTransactionForm;
