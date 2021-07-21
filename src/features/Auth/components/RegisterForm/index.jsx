import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/FormControl/InputField/index';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Avatar, Button, LinearProgress } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PasswordField from '../../../../components/FormControl/PasswordField/index.jsx';

RegisterForm.propTypes = {
    submitForm: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
    submitForm: null,
};

const useStyles = makeStyles((theme) => ({
    root: {
        //1 = 8px
        paddingTop: theme.spacing(4),
        position: 'relative',
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(2, 0, 3, 0),
    },
    submit: {
        margin: theme.spacing(3, 0, 1),
    },

    progess: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    },
}));

function RegisterForm(props) {
    const classes = useStyles();

    const schema = yup.object().shape({
        full_name: yup
            .string()
            .required('Please enter full name')
            .test('min two word', 'Please enter full name min two word', (value) => {
                return value.split(' ').length >= 2;
            }),

        email: yup.string().required('Please enter email').email('Please enter format Email address'),
        password: yup.string().required('Please enter password').min(6, 'Please enter password min 6 character'),
        retype_password: yup
            .string()
            .required('Please enter retype_password')
            .oneOf([yup.ref('password')], 'Password not match'),
    });
    const form = useForm({
        defaultValues: {
            full_name: '',
            email: '',
            password: '',
            retype_password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (value) => {
        const { submitForm } = props;
        if (!value || !submitForm) return;

        await submitForm(value);
    };

    const { isSubmitting } = form.formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progess} />}
            <Avatar className={classes.avatar}>
                <LockOutLineIcon></LockOutLineIcon>
            </Avatar>
            <Typography className={classes.title}>Sign Up</Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="full_name" label="User Name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retype_password" label="Retype Password" form={form} />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.submit}
                    color="primary"
                    variant="contained"
                    fullWidth
                    size="large"
                >
                    Create An Account
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
