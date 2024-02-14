"use client"
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/api/route';
import { IconButton, ListItemText, styled } from '@mui/material';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import OutboxIcon from '@mui/icons-material/Outbox';
import '@fontsource-variable/sometype-mono';
import Link from 'next/link';

const drawerWidth = 240;
const href = ["", "/", "/transactions", "/income", "/expenses"];

const TopNav = ({ children }) => {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const result = await logout();
            console.log(result);
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const drawer = (
        <div style={{ height: "calc(110vh - 64px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <List>
                {['', 'Panel principal', 'Transacciones', 'Ingresos', 'Gastos'].map((text, index) => (
                    <ListItem key={text} sx={{ mt: 2 }}>
                        <ListItemButton>
                            <ListItemIcon sx={{ color: "#6C584C" }}>
                                {index == 1 && <AssessmentOutlinedIcon />}
                                {index == 2 && <CreditCardOutlinedIcon />}
                                {index == 3 && <InboxIcon />}
                                {index == 4 && <OutboxIcon />}
                            </ListItemIcon>
                            <Link 
                                href={href[index]}
                                style={{
                                textDecoration: 'none',
                                color: '#414833',
                                marginLeft: -17
                            }}>
                                {text}
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: "#6C584C" }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText onClick={handleLogout} sx={{ ml: -3 }}>Cerrar sesión</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: "#8E9574"
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div" sx={{ fontFamily: "Sometype Mono Variable, monospace", ml: 0 }}>
                        ExpenseTracker
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, height: "100vh", width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: "#F6F6F6" }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default TopNav;
