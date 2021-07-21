import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from './../../../../components/FormControl/QuantityField/index';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Please enter a quantity')
            .min(1, 'Minimun value is 1')
            .typeError('Please enter number'),
    });
    const form = useForm({
        defaultValues: {
            quantity: 0,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (value) => {
        if (!value || !onSubmit) return;

        await onSubmit(value);
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name="quantity" label="Quantity" form={form} />

            <Button type="submit" color="primary" variant="contained" fullWidth size="large">
                Add to cart
            </Button>
        </form>
    );
}

export default AddToCartForm;
