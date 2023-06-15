import React, {ChangeEvent, MouseEvent, useState} from 'react';
import './App.css';
import {AppBar, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {TodoListsWithRedux} from "./TodoLists/TodoListsWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {taskRT} from "./api/task-api";

/*export type taskType = {
    id: string
    title: string
    isDone: boolean
}*/
export type filterType = 'All' | 'Completed' | 'InProgress'
export type tasksType = {
    [key: string]: taskRT[]
}

function App() {
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
            </AppBar>
            <Provider store={store}><TodoListsWithRedux/></Provider>
        </Container>
    );
}

export default App;

