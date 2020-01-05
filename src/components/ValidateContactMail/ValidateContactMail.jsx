import React from 'react';
import { Formik } from "formik";
import {useHistory} from 'react-router-dom';

import axios from 'axios';
import * as Yup from 'yup';
import {add_user} from "../../action/actionCreators";
import apiSent from '../../api/config';
import toastr from "toastr";

const ValidateContactMail = () => {
    const history = useHistory();
    return (
        <Formik
            initialValues={{email: '', subject: '', message: ''}}
            onSubmit={ (values, {setSubmitting, resetForm, setStatus} )=>  {
                console.log(values);
                resetForm({});
                    setTimeout(()=> {
                        //xử lý add user
                        try{
                            apiSent.post('/send-mail', values)
                                .then(res => {
                                    if(typeof res.data.success != "undefined"){
                                        toastr.success('You sent successfully contact mail ', {closeDuration: 300});

                                        setStatus(true);
                                    }
                                }).catch((error)=>{
                                toastr.error('You did not sent successfully contact mail ', {closeDuration: 300});
                                resetForm({});
                                setStatus(false);
                            });
                        }catch(e){
                            toastr.error('You did not sent successfully contact mail ', {closeDuration: 300});
                            resetForm({});
                            setStatus(false);
                        }
                    }, 200);
                }
            }
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required("required"),
                subject: Yup.string()
                    .required("required")
                    .min(2, "Subject is to short - should be 2 chars minimum"),
                message: Yup.string()
                    .required("required")
                    .min(2, "message is to short - should be 2 chars minimum"),
            })}
        >
            {  props => {
                const {values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit} = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="username">Email</label>
                                    <input type="email" name="email" placeholder={'Enter your email'}
                                           className={(errors.name && touched.name) ? "error" : "form-control"}
                                           value={values.email}
                                           onChange={handleChange} onBlur={handleBlur} />

                                    {errors.email && touched.email && (
                                        <div className="input-feedback" style={{marginTop: '20px'}}>{errors.email}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input type="text" name="subject" placeholder={'Enter your subject'}
                                           className={(errors.subject && touched.subject) ? "error" : "form-control"}
                                           value={values.subject} onChange={handleChange} onBlur={handleBlur} />

                                    {errors.subject && touched.subject && (
                                        <div className="input-feedback" style={{marginTop: '20px'}}>{errors.email}</div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea type="email" name="message" placeholder={'Enter your Message'}
                                           className={(errors.message && touched.message) ? "error" : "form-control"}
                                              value={values.message} onChange={handleChange} onBlur={handleBlur} />

                                    {errors.subject && touched.subject && (
                                        <div className="input-feedback" style={{marginTop: '20px'}}>{errors.subject}</div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button className="primary-button" disabled={isSubmitting}>Submit</button>
                            </div>
                        </div>
                    </form>
                )

            }}
        </Formik>
    )
}
export default ValidateContactMail;