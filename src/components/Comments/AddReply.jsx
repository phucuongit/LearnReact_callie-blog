import React, {useContext} from "react";
import { Formik } from "formik";
import {useHistory} from 'react-router-dom';

import axios from 'axios';
import * as Yup from 'yup';
import {add_user} from "../../action/actionCreators";
import apiSent from '../../api/config';
import toastr from "toastr";
import {CommentContext} from "../../Context";
import {addReply} from '../../action/CommentActionCreators';

const AddReply = ({comment_id, post_id}) => {

    let [comments, dispatch] = useContext(CommentContext);
    const history = useHistory();
    return (
        <Formik
            initialValues={{email: '', subject: '', message: '', comment_id: comment_id, post_id: post_id}}
            onSubmit={ (values, {setSubmitting, resetForm, setStatus} )=>  {
                console.log(values);
                resetForm({});
                setTimeout(()=> {
                    //xử lý add user
                    try{
                        apiSent.post('/replies/store', values)
                            .then(res => {
                                if(typeof res.data.newReply != "undefined"){
                                    dispatch(addReply(res.data.newReply));
                                    toastr.success('You reply successfully', {closeDuration: 300});

                                    setStatus(true);
                                }
                            }).catch((error)=>{
                            toastr.error('You did not reply', {closeDuration: 300});
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
                    <div className="section-row">
                        <div className="section-title">
                            <h3 className="title">Leave a reply</h3>
                        </div>
                        <form className="post-reply" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                         <textarea type="email" name="message" placeholder={'Enter your Message'}
                                                   className={(errors.message && touched.message) ? "error input" : "form-control input"}
                                                   value={values.message} onChange={handleChange} onBlur={handleBlur} />

                                        {errors.message && touched.message && (
                                            <div className="input-feedback" style={{marginTop: '20px'}}>{errors.message}</div>
                                        )}

                                    </div>
                                </div>
                                <input type="hidden" hidden={true} name="comment_id" value={values.comment_id} />
                                <input type="hidden" hidden={true} name="post_id" value={values.post_id} />
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="email" name="email" placeholder={'Enter your email'}
                                               className={(errors.name && touched.name) ? "error" : "form-control input"}
                                               value={values.email}
                                               onChange={handleChange} onBlur={handleBlur} />

                                        {errors.email && touched.email && (
                                            <div className="input-feedback" style={{marginTop: '20px'}}>{errors.email}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <button className="primary-button">Submit</button>
                                </div>

                            </div>
                        </form>
                    </div>
                )}
            }
        </Formik>
    )
}
export default AddReply;