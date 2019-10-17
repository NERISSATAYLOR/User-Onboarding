import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

import { withFormik, Form, Field } from 'formik';


const UserForm = ({ values, touched, errors, status }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        status && setUsers(users => [...users, status])
    }, [status])
    return (
        <div className="form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field type="email" name="email" />
                <Field type="password" name="password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label className="checkbox-container">
                    {""} Term of Service
                    <Field type="checkbox" name="tos" checked={values.tos} />
                </label>
                <button>Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name:{user.name}</li>
                    <li>Email:{user.email}</li>
                    <li>Password:{user.password}</li>
                </ul>
            ))}
        </div>
    );
};
const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Put your name here'),
        password: Yup.string().required("Hey password NOW")
    }),
    handleSubmit(values, { setStatus }) {
        axios.post('https://reqres.in/api/users/', values)
            .then(res => {
                console.log(res.data);
                setStatus(res.data);
            })
            .catch(err => console.log(err.response))
    }
})(UserForm);
export default FormikForm;
