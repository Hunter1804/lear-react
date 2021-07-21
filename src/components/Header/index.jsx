import { Badge, Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Close, ShoppingCart } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Login from '../../features/Auth/components/Login/index.jsx';
import Register from '../../features/Auth/components/Register/index.jsx';
import { logout } from '../../features/Auth/userSlice.js';
import { cartItemSelectorCard } from './../../features/Carts/selector';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: '#FFF',
    },

    closeButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
        'z-index': 1,
    },
}));

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

export default function ButtonAppBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user.current);
    const isLoggedIn = !!user.id;
    const classes = useStyles();
    const [mode, setMode] = useState(MODE.LOGIN);
    const [open, setOpen] = useState(false);
    const cartItemCount = useSelector(cartItemSelectorCard);

    const [anchorEl, setAnchorEl] = useState(null); //menu

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
    };

    const handleClickCart = () => {
        history.push('/cart');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to="/">
                            EZ SHOP
                        </Link>
                    </Typography>

                    <NavLink className={classes.link} to="/product">
                        <Button color="inherit">Product</Button>
                    </NavLink>
                    <NavLink className={classes.link} to="/clock">
                        <Button color="inherit">Clock</Button>
                    </NavLink>
                    <NavLink className={classes.link} to="/magic-color">
                        <Button color="inherit">Magic Color</Button>
                    </NavLink>
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}

                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleClickCart}>
                        <Badge badgeContent={cartItemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {isLoggedIn && (
                        <IconButton
                            color="inherit"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClickOpenMenu}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            <Menu
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <IconButton className={classes.closeButton} onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                                    Don't have an account. Register here
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
