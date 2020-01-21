import React, {useContext, useEffect, useRef} from "react";
import { Formik } from "formik";
import axios from 'axios';
import * as EmailValidator from "email-validator";

import Cookies from 'js-cookie';
import * as Yup from "yup";
import './style.scss';
import {UserLoginContext} from '../../Context';
import toastr from 'toastr';
import 'toastr/toastr.scss';

const ValidatedLoginForm = ({appProps, history}) =>{
    const {setUserLogin} = useContext(UserLoginContext);
    function useIsMountedRed (){
        const isMountedRef = useRef(null);
        useEffect(()=>{
            isMountedRef.current = true;
            return () => isMountedRef.current = false;
        });
        return isMountedRef;
    }
    const isMountedRef = useIsMountedRed();
    useEffect( () => {

    }, [ isMountedRef]);
    return (
        <div>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting ,setStatus, resetForm}) => {

                    setTimeout(() => {
                        try{
                            axios.post('http://localhost:8000/api/login', values, {
                                headers: { 'Access-Control-Allow-Origin': "http://localhost:3000/",
                                    'Access-Control-Allow-Methods': 'POST',
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Credentials': 'true',
                                }
                            }).then(res =>{
                                toastr.success('You login successfully', {closeDuration: 300});
                                if(isMountedRef){
                                    const AUTH_TOKEN = res.data.success.token;
                                    Cookies.set('access_token', 'Bearer ' + AUTH_TOKEN, {expires: 7});
                                    Cookies.set('user_login', res.data.success.user, {expires: 7 });
                                    setUserLogin(res.data.success.user);

                                }
                                setSubmitting(false);
                                setStatus(true);
                                appProps.setAuthenticated(true);
                                history.push("/");

                            }).catch((error)=>{
                                toastr.error('Password or Email incorrect', 'Login fails', {closeDuration: 300, closeButton: true});
                                resetForm({});
                                setStatus(false);
                            });
                        }catch(errors){
                            toastr.error('Password or Email incorrect', 'Login fails', {closeDuration: 300, closeButton: true});
                            resetForm({});
                            setStatus(false);
                        }
                    }, 500);
                }}
                //********Handling validation messages yourself*******/
                // validate={values => {
                //   let errors = {};
                //   if (!values.email) {
                //     errors.email = "Required";
                //   } else if (!EmailValidator.validate(values.email)) {
                //     errors.email = "Invalid email address";
                //   }

                //   const passwordRegex = /(?=.*[0-9])/;
                //   if (!values.password) {
                //     errors.password = "Required";
                //   } else if (values.password.length < 8) {
                //     errors.password = "Password must be 8 characters long.";
                //   } else if (!passwordRegex.test(values.password)) {
                //     errors.password = "Invalida password. Must contain one number";
                //   }

                //   return errors;
                // }}
                //********Using Yum for validation********/

                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required("Required"),
                    password: Yup.string()
                        .required("No password provided.")
                        .min(8, "Password is too short - should be 8 chars minimum.")
                        .matches(/(?=.*[0-9])/, "Password must contain a number.")
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.email && touched.email && "error"}
                            />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                            <label htmlFor="email">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.password && touched.password && "error"}
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                            )}
                            <button type="submit" disabled={isSubmitting}>
                                Login
                            </button>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default ValidatedLoginForm;