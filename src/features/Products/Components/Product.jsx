import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, PLACEHOLDER_HOST } from './../../../constants/index';
import { useHistory } from 'react-router-dom';
import { formatPrice } from './../../../ultils';

Product.propTypes = {
    product: PropTypes.object,
};

Product.defaultProps = {
    product: {},
};

function Product(props) {
    const { product } = props;
    const history = useHistory();

    const thumbnail = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : PLACEHOLDER_HOST;

    const handleClick = () => {
        //navigate to product detail /product/:id
        history.push(`/product/${product.id}`);
    };
    return (
        <Box padding={1} onClick={handleClick}>
            <Box minHeight={274}>
                <img src={thumbnail} alt="" width="100%" />
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                <Box component="span" fontSize="16px" fontWeight="bold" marginRight={1}>
                    {formatPrice(product.salePrice)}
                </Box>
                {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
            </Typography>
        </Box>
    );
}

export default Product;
