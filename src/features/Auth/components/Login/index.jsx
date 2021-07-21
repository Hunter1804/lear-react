import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice.js';
import LoginForm from './../LoginForm/index';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (user) => {
        try {
            //custom data from form enter form
            user.username = user.email;
            const action = login(user);

            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            const { closeDialog } = props;
            if (closeDialog) closeDialog();
        } catch (error) {
            console.log('Fail to registe', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <div>
            <LoginForm submitForm={handleSubmit} />
        </div>
    );
}

export default Register;
