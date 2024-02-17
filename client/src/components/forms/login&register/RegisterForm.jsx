'use client'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { register } from '@/app/api/route';
import Link from 'next/link';
import FormWrapper from './FormWrapper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar } from '@mui/material';
import styles from './page.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const router = useRouter();
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };
        try {
            const result = await register(data);
            console.log(result);
            router.push("/login");
        } catch (error) {
            console.log(error);
            const valErrors = error.response.data.errors;
            if (error.response?.data?.errors) {
                setErrors({
                    firstName: valErrors.firstName?.message ? valErrors.firstName.message : "",
                    lastName: valErrors.lastName?.message ? valErrors.lastName.message : "",
                    email: valErrors.email?.message ? valErrors.email.message : "",
                    password: valErrors.password?.message ? valErrors.password.message : "",
                    confirmPassword: valErrors.confirmPassword?.message ? valErrors.confirmPassword.message : ""
                });
            }
        }
    };

    return (
        <FormWrapper>
            <Avatar sx={{ m: 1, bgcolor: '#6C584C', color: '#DAD7CD' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 1, color: "#3b322b" }}>
                Regístrate
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            variant="filled"
                            id="firstName"
                            label="Nombre"
                            sx={{
                                '& label.Mui-focused': {
                                    color: '#3b322b',
                                },
                            }}
                            color="success"
                            error={errors.firstName ? true : false}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            variant="filled"
                            id="lastName"
                            label="Apellido"
                            name="lastName"
                            autoComplete="family-name"
                            sx={{
                                '& label.Mui-focused': {
                                    color: '#3b322b',
                                },
                            }}
                            color="success"
                            error={errors.lastName ? true : false}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="filled"
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            sx={{
                                '& label.Mui-focused': {
                                    color: '#3b322b',
                                },
                            }}
                            color="success"
                            error={errors.email ? true : false}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="filled"
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            sx={{
                                '& label.Mui-focused': {
                                    color: '#3b322b',
                                },
                            }}
                            color="success"
                            error={errors.password ? true : false}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="filled"
                            name="confirmPassword"
                            label="Confirmar contraseña"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            sx={{
                                '& label.Mui-focused': {
                                    color: '#3b322b',
                                },
                            }}
                            color="success"
                            error={errors.confirmPassword ? true : false}
                            helperText={errors.confirmPassword}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mb: 4,
                        mt: 3,
                        backgroundColor: "#6C584C",
                        '&:hover': {
                            backgroundColor: "#524239",
                        },
                        color: '#DAD7CD'
                    }}
                >
                    Regístrate
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2" className={styles.link}>
                            ¿Ya tienes una cuenta? Inicia sesión
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </FormWrapper>
    );
}

export default RegisterForm;