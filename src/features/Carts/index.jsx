import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartTotalSelectorCard } from './selector.js';
import { Box, Grid, Paper, makeStyles, Typography, Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import CartItem from './CartItem';
import { formatPrice } from './../../ultils/common';

CartFeature.propTypes = {};
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
    },
    title: {
        paddingTop: theme.spacing(2),
    },
    buttonPayment:{
        textAlign:'center',
    }
}));

function CartFeature(props) {
    const cartTotal = useSelector(cartTotalSelectorCard);
    const classes = useStyles();

    const cartData = useSelector((state) => state.cart.cartItems);
    console.log('cartData', cartData);
    return (
        <Box className={classes.root}>
            <Container>
                <Paper className={classes.paper}>
                    <Box>
                        <Typography className={classes.title} align="center" component="h1" variant="h4">
                            {`Tổng tiền trong giỏ hàng của bạn là: ${formatPrice(cartTotal)}`}
                        </Typography>
                    </Box>
                    {cartData.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))}
                    <Box className={classes.buttonPayment}>
                        <Button type="submit" color="primary" variant="contained" size="large">
                            Thanh Toán
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default CartFeature;
