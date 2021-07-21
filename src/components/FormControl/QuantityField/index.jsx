import { Box, IconButton, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import { RemoveCircleOutline } from '@material-ui/icons';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
    w_50: {
        maxWidth: '250px',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
    },
    title: {
        marginBottom: theme.spacing(1),
    },
}));

function QuantityField(props) {
    const classes = useStyles();
    const { form, label, name, disabled } = props;
    const { setValue } = form;
    const errors = form.formState.errors;
    const hasError = !!errors[name];

    return (
        <FormControl fullWidth variant="outlined" margin="normal" size="small">
            {/* <InputLabel error={!!hasError} htmlFor={name}></InputLabel> */}
            <Typography className={classes.title}>{label}</Typography>
            <Controller
                name={name}
                control={form.control}
                // rules={{ required: true }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Box className={classes.w_50}>
                        <IconButton
                            onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}
                        >
                            <RemoveCircleOutline />
                        </IconButton>

                        <OutlinedInput
                            id={name}
                            type="number"
                            // label={label}
                            disabled={disabled}
                            value={value}
                            name={name}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={error}
                        />

                        <IconButton
                            onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}
                        >
                            <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                    </Box>
                )}
            />
            {!!hasError && (
                <FormHelperText error id={`${name}-error`}>
                    {errors[name]?.message}
                </FormHelperText>
            )}
        </FormControl>
    );
}

export default QuantityField;
