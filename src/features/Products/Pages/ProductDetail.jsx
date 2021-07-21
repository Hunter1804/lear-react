import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { addToCart } from '../../Carts/cartSlice.js';
import ProductContent from '../Components/ProductDetail/ProductContent.jsx';
import ProductDescription from '../Components/ProductDetail/ProductDescription.jsx';
import AddToCartForm from './../Components/ProductDetail/AddToCartForm';
import ProductAdditional from './../Components/ProductDetail/ProductAdditional';
import ProductInfo from './../Components/ProductDetail/ProductInfo';
import ProductReview from './../Components/ProductDetail/ProductReview';
import Thumbnail from './../Components/ProductDetail/Thumbnail';
import useProductDetail from './../Hooks/useProductDetail';

ProductDetail.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(3),
    },
    left: {
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
    right: {
        padding: theme.spacing(1.5),
        flex: '1 1 0',
    },

    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
}));

function ProductDetail() {
    const classes = useStyles();
    const {
        params: { productId },
        url,
    } = useRouteMatch();
    const dispatch = useDispatch();

    const { product, loading } = useProductDetail(productId);
    console.log('render');
    // console.log('loading', loading);
    if (loading) {
        return (
            <Box className={classes.loading}>
                <LinearProgress />
            </Box>
        );
    }

    const handleAddToCart = (formValue) => {
        const action = addToCart({
            id: product.id,
            product,
            quantity: formValue.quantity,
        });
        dispatch(action);
    };

    return (
        <Box>
            <Container>
                <Paper>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <Thumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCart} />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper>
                    <ProductDescription />

                    <Switch>
                        <Route exact path={url}>
                            <ProductContent product={product} />
                        </Route>

                        <Route exact path={`${url}/additional`}>
                            <ProductAdditional />
                        </Route>

                        <Route exact path={`${url}/reviews`}>
                            <ProductReview />
                        </Route>
                    </Switch>
                </Paper>
            </Container>
        </Box>
    );
}

export default ProductDetail;
