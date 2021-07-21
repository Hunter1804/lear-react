import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { } from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

FilterByPrice.defaultProps = {
    onChange: null,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
    range: {
        display: 'flex',
        flexFlow: 'row nowrap',

        '& > span': {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
    },

    button: {
        marginTop: theme.spacing(1),
    },
}));
function FilterByPrice({ onChange }) {
    const classes = useStyles();
    const [value, setValue] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        if (value > 0) {
            setValue((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleSubmit = () => {
        if (onChange) onChange(value);
    };
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Giá</Typography>
            <Box className={classes.range}>
                <TextField name="salePrice_gte" value={value.salePrice_gte} onChange={handleChangeValue}></TextField>
                <span>-</span>
                <TextField name="salePrice_lte" value={value.salePrice_lte} onChange={handleChangeValue}></TextField>
            </Box>
            <Button className={classes.button} variant="outlined" color="primary" onClick={handleSubmit}>
                Áp dụng
            </Button>
        </Box>
    );
}

export default FilterByPrice;
