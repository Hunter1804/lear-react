import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
    w_100: { width: '100%' },
}));

function PasswordField(props) {
    const classes = useStyles();
    const { form, label, name, disabled } = props;
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((x) => !x);
    };

    const errors = form.formState.errors;
    const hasError = !!errors[name];

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel error={hasError} htmlFor={name}>
                {label}
            </InputLabel>
            <Controller
                name={name}
                control={form.control}
                // rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                    <div className={classes.w_100}>
                        <OutlinedInput
                            fullWidth
                            {...field}
                            id={name}
                            type={showPassword ? 'text' : 'password'}
                            label={label}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                            error={error}
                            disabled={disabled}
                        />
                    </div>
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

export default PasswordField;
