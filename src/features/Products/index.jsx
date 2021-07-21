import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './Pages/ListPages.jsx';
import ProductDetail from './Pages/ProductDetail';

ProductFeature.propTypes = {};

function ProductFeature(props) {
    const match = useRouteMatch();
    console.log('match.url', match.url);
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
                <Route path={`${match.url}/:productId`} component={ProductDetail} />
            </Switch>
        </Box>
    );
}

export default ProductFeature;
