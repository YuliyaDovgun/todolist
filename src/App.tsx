import React, {ChangeEvent, MouseEvent, useState} from 'react';
import './App.css';
import {AppBar, Container, IconButton, LinearProgress, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {appStatusType} from "./state/app-reducer";
import ErrorSnackbar from "./common/SnackBar/ErrorSnackbar";
import {Login} from "./Login/Login";
import {Navigate, Route, Routes} from 'react-router-dom';
import {TodoListsWithRedux} from "./TodoLists/TodoListsWithRedux";

function App() {

    const status = useSelector<AppRootStateType, appStatusType>(state => state.app.status)

    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container fixed>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Routes>
                <Route path={'/'} element={<TodoListsWithRedux/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/404'} element={'Not found'}/>
                <Route path={'*'} element={<Navigate to={'404'}/>}/>
            </Routes>
        </Container>
    );
}

export default App;

