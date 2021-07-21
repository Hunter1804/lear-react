import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../components/FormControl/InputField/index';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



TodoForm.propTypes = {
    submitForm: PropTypes.func,
};

TodoForm.defaultProps = {
    submitForm: null
}

function TodoForm(props) {
    const schema = yup.object().shape({
        title: yup.string().required("Please enter title"),
    });
    const form = useForm({
        defaultValues:{
            title: ""
        },
        resolver: yupResolver(schema)
    })

    function handleSubmit (value) {
        console.log('todo form', value)
    }

    return (
        <div>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name='title' label='Todo' form={form}/>
            </form>
        </div>
    );
}

export default TodoForm;