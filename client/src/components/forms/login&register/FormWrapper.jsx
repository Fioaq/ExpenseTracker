import { Fragment } from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Link from "next/link";

const FormWrapper = ({ children }) => {
    const Copyright = (value) => {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...value}>
                {'Copyright © '}
                <Link
                    color="inherit"
                    href="/"
                    style={{
                        textDecoration: 'none',
                        boxShadow: 'none',
                        color: '#5F4E42',
                        fontWeight: 600
                    }}>
                    ExpenseTracker
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography >
        );
    }
    
    return (
        <Fragment>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh">
                <Container component="main" maxWidth="xs" disableGutters={true}>{/**Coloca como un componente MAIN y lo dejo su maxWidth a xs O 12 */}
                <CssBaseline />
                    <Box
                        sx={{
                            padding: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(218, 215, 205, 0.450)',
                            borderRadius: 2,
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
                        }}
                    >
                        {children}
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Container>
            </Box>
        </Fragment >
    )
}

export default FormWrapper;