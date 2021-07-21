import { Box, makeStyles, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { PropTypes } from 'prop-types';
import React from 'react';

FilterByService.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
    },
}));

function FilterByService({ filters, onChange }) {
    const classes = useStyles();

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (!onChange) return;
        onChange({ [name]: checked });
    };
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle1">Dịch vụ</Typography>
            <ul className={classes.menu}>
                {[
                    { value: 'isPromotion', label: 'Có giảm giá' },
                    { value: 'isFreeShip', label: 'Có free ship' },
                ].map((service) => (
                    <FormControlLabel
                        key={service.value}
                        control={
                            <Checkbox
                                checked={Boolean(filters[service.value])}
                                onChange={handleChange}
                                name={service.value}
                                color="primary"
                            />
                        }
                        label={service.label}
                    />
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;
