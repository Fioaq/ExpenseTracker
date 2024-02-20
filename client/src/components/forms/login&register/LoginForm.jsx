'use client'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { login } from '@/app/api/route';
import FormWrapper from './FormWrapper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar } from '@mui/material';
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectUser, setUser } from '@/lib/features/users/userSlice';

const LoginForm = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const router = useRouter();
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        }
        try {
            const result = await login(data);
            dispatch(setUser(result.usuario));
            router.push("/");
        } catch (error) {
            console.log(error);
            const valErrors = error.response.data;
            setErrors({
                email: valErrors.email?.message ? valErrors.email.message : "",
                password: valErrors.password?.message ? valErrors.password.message : ""
            });
        }
    };

    return (
        <FormWrapper>
            <Avatar sx={{ m: 1, bgcolor: '#6C584C', color: '#DAD7CD' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 1, color: "#3b322b" }}>
                Iniciar sesión
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="dense"
                    variant='filled'
                    required
                    fullWidth
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
                <TextField
                    margin="dense"
                    variant='filled'
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{
                        '& label.Mui-focused': {
                            color: '#3b322b',
                        },
                    }}
                    color="success"
                    error={errors.password ? true : false}
                    helperText={errors.password}
                />
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
                        color: '#DAD7CD',
                    }}
                >
                    Iniciar sesión
                </Button>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <Link href="/passwordReset" variant="body2" className={styles.link}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <Link href="/register" variant="body2" className={styles.link}>
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                </Box>
            </Box>
        </FormWrapper>
    );

}

export default LoginForm;
