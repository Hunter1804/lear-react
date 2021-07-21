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

LoginForm.propTypes = {
    submitForm: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
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

function LoginForm(props) {
    const classes = useStyles();

    const schema = yup.object().shape({
        identifier: yup.string().required('Please enter email').email('Please enter format Email address'),
        password: yup.string().required('Please enter password'),
    });
    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
            <Typography className={classes.title}>Sign In</Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.submit}
                    color="primary"
                    variant="contained"
                    fullWidth
                    size="large"
                >
                    Sign in
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
