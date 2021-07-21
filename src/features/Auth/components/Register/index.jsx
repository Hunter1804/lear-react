import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice.js';
import RegisterForm from './../RegisterForm/index';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (user) => {
        console.log('user data', user);
        try {
            //custom data from form enter form
            user.username = user.email;
            const action = register(user);
            console.log(action);

            const resultAction = await dispatch(action);
            const newUser = unwrapResult(resultAction);

            const { closeDialog } = props;
            if (closeDialog) closeDialog();
            console.log('New user', newUser);
            enqueueSnackbar('Register sucessfully', { variant: 'success' });
        } catch (error) {
            console.log('Fail to registe', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <div>
            <RegisterForm submitForm={handleSubmit} />
        </div>
    );
}

export default Register;
