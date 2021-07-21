import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles, Typography, IconButton } from '@material-ui/core';
import { PLACEHOLDER_HOST } from '../../constants/index.js';
import { STATIC_HOST } from './../../constants/common';
import { formatPrice } from './../../ultils/common';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { RemoveCircleOutline } from '@material-ui/icons';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch } from 'react-redux';
import { addToCart, setQuantity } from './cartSlice.js';

CartItem.propTypes = {
    cartItem: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    salePrice: {
        float: 'right',
    },
    quantity: {
        display: 'flex',
        marginTop: theme.spacing(2),
        height: theme.spacing(4),
    },
}));

function CartItem({ cartItem = {} }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const thumbnail = cartItem.product.thumbnail
        ? `${STATIC_HOST}${cartItem.product.thumbnail?.url}`
        : PLACEHOLDER_HOST;

    const handleClickMinus = () => {
        const action = addToCart({
            id: cartItem.id,
            quantity: cartItem.quantity === 0 ? 0 : -1,
        });
        dispatch(action);
    };

    const handleClickPlus = () => {
        const action = addToCart({
            id: cartItem.id,
            quantity: 1,
        });
        dispatch(action);
    };

    const handleChangeQuantity = (e) => {
        const quantity = parseInt(e.target.value);

        const action = setQuantity({
            id: cartItem.id,
            quantity,
        });

        dispatch(action);
    };
    return (
        <Box className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <img src={thumbnail} alt="" width="100%" />
                </Grid>

                <Grid item xs={8}>
                    <Typography component="h1" variant="h4">
                        {cartItem.product.name}
                    </Typography>
                    <Typography variant="body2" className={classes.description}>
                        {cartItem.product.shortDescription}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Box component="span">{`Số lượng: ${cartItem.quantity} sản phẩm`}</Box>
                    <Box component="span" className={classes.salePrice}>
                        {formatPrice(cartItem.product.salePrice)}
                    </Box>
                    <Box component="div" className={classes.quantity}>
                        <IconButton onClick={handleClickMinus}>
                            <RemoveCircleOutline />
                        </IconButton>

                        {/* <OutlinedInput type="number" onchange={handleChangeQuantity} name="salePrice" /> */}
                        <input id="search" type="number" value={cartItem.quantity} onChange={handleChangeQuantity} />

                        <IconButton onClick={handleClickPlus}>
                            <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CartItem;
