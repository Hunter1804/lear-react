import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, label, name, disabled } = props;

    return (
        <Controller
            name={name}
            control={form.control}
            // rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    disabled={disabled}
                    label={label}
                    error={!!error}
                    helperText={error && error.message ? error.message : ''}
                />
            )}
        />
    );
}

export default InputField;
