import { Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React from 'react';

ProductListSkeleton.propTypes = {
    length: PropTypes.number,
};

ProductListSkeleton.defaultProps = {
    length: 6,
};

function ProductListSkeleton(props) {
    const { length } = props;
    console.log('call skeleton');
    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((x, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Box padding={1}>
                            <Skeleton variant="rect" width="100%" height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductListSkeleton;
