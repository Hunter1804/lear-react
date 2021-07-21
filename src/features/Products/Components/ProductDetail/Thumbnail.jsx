import React from 'react';
import PropTypes from 'prop-types';
import { STATIC_HOST, PLACEHOLDER_HOST } from './../../../../constants';
import { Box } from '@material-ui/core';

Thumbnail.propTypes = {
    product: PropTypes.object,
};

function Thumbnail({ product }) {
    const thumbnail = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : PLACEHOLDER_HOST;
    return (
        <Box>
            <img src={thumbnail} alt="" width="100%" />
        </Box>
    );
}

export default Thumbnail;
