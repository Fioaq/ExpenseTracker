'use client'
import { Fragment, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import { passwordReset, passwordResetToken } from "@/app/api/route";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/navigation";
import FormWrapper from "./FormWrapper";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

const ColorlibConnector = styled(StepConnector)(() => ({
    [`& .${stepConnectorClasses.line}`]: {
        height: 1,
        border: 0,
        backgroundColor: 'black',
        opacity: 0.3,
        marginLeft: 10,
        marginRight: 10,
    },
}));

const steps = ['Ingrese su correo', 'Ingrese el token', 'Cambie su contraseña'];

const PasswordResetForm = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const [activeStep, setActiveStep] = useState(0);


    const handleNext = async () => {

        if (activeStep === 0) {
            try {
                const getToken = await passwordResetToken({ email: email });
                console.log(getToken);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } catch (error) {
                console.log(error);
                setErrors({
                    email: error.response.data.error,
                });
            }
        }
        else if (activeStep === 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else if (activeStep === 2) {
            try {
                const data = {
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    token: token
                }
                const updatePassword = await passwordReset(data);
                console.log(updatePassword);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setTimeout(() => {
                    router.push("/login")
                }, 2000);

            } catch (error) {
                console.log(error);
            }
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <FormWrapper>
            <Box>
                <Stepper activeStep={activeStep} sx={{ width: "24rem" }} connector={<ColorlibConnector />}>
                    {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps} sx={{
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: '#6C584C', // circle color (ACTIVE)
                                },
                                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                    fill: 'white', // circle's number (ACTIVE)
                                },
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: '#524239', // circle color (COMPLETED)
                                },
                            }}>
                                <StepLabel {...labelProps}></StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <Fragment>
                        <Typography variant="h6" sx={{ display: "flex", justifyContent: "center", mt: 2, color: "#3b322b" }}>
                            Contraseña cambiada exitosamente.
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset} sx={{ color: "#524239", fontWeight: "bold" }}>Reiniciar</Button>
                        </Box>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Box sx={{ mt: 2 }}>
                            {
                                activeStep === 0 &&
                                <Fragment>
                                    <Typography variant="h6" sx={{ display: "flex", justifyContent: "center", mb: 2, color: "#3b322b" }}>
                                        {steps[0]}
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Correo electrónico"
                                        fullWidth
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#3b322b',
                                            },
                                        }}
                                        color="success"
                                        error={errors.email ? true : false}
                                        helperText={errors.email}
                                    />
                                </Fragment>
                            }
                            {
                                activeStep === 1 &&
                                <Fragment>
                                    <Typography variant="h6" sx={{ display: "flex", justifyContent: "center", mb: 2, color: "#3b322b" }}>
                                        {steps[1]}
                                    </Typography>
                                    <MuiOtpInput length={6} value={token} onChange={setToken}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    color: '#fff',
                                                    borderColor: '#3b322b'
                                                }
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                backgroundColor: "#00000020",
                                            },
                                        }} />
                                </Fragment>
                            }
                            {
                                activeStep === 2 &&
                                <form>
                                    <Typography variant="h6" sx={{ display: "flex", justifyContent: "center", mb: 2, color: "#3b322b" }}>
                                        {steps[2]}
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        margin="dense"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="Nueva contraseña"
                                        type="password"
                                        autoComplete="new-password"
                                        fullWidth
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#3b322b',
                                            },
                                        }}
                                        color="success"
                                        error={errors.password ? true : false}
                                        helperText={errors.password}
                                    />
                                    <TextField
                                        variant="filled"
                                        margin="dense"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        label="Confirme la contraseña"
                                        type="password"
                                        fullWidth
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
                                </form>

                            }
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0 || activeStep === 1}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Volver
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext} sx={{ color: "#524239", fontWeight: "bold" }}>
                                    {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                                </Button>
                            </Box>
                        </Box>
                    </Fragment>
                )}
            </Box>
        </FormWrapper >
    );
}

export default PasswordResetForm;