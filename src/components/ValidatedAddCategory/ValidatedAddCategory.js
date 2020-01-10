import React, {useContext} from "react";
import { Formik } from "formik";
import axios from 'axios';
import {Link} from 'react-router-dom';
import * as EmailValidator from "email-validator";
import Cookies from 'js-cookie';
import * as Yup from "yup";
import Context from "../../Context";
import {DashBoardContext} from "../../Context";
import {addCategory} from '../../action/CategoryActionCreators';
import toastr from 'toastr';

const ValidatedAddCategory = ({history}) => {
    const [ state, dispatch ] = useContext(DashBoardContext);

    return (
        <div>

            <Formik initialValues={{name: '', slug: ''}}
                    enableReinitialize={true}
                    onSubmit={(values, {setSubmitting, resetForm, setStatus}) => {
                        console.log(values);
                        setTimeout(()=> {
                            //xử lý add user
                            try{
                                axios.post('http://localhost:8000/api/categories/add', values, {headers: {Authorization: Cookies.get('access_token')}})
                                    .then(res => {
                                        dispatch(addCategory(values));
                                        toastr.success('You add successfully category');
                                        resetForm({});
                                    }).catch((error)=>{
                                        toastr.error(error, 'Error Add Category');
                                });
                            }catch(e){
                                toastr.error(e, 'Error Add Category');
                            }
                        }, 200);
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .required('required')
                            .min(2, "name category is to short - should be 2 chars minimum"),
                        slug: Yup.string()
                            .required('required'),
                    })}
            >
                {props => {
                    const {values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit} = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="username">User Name</label>
                                    <input type="text" name="name" placeholder={'Enter your name'}
                                           className={(errors.name && touched.name) ? "error" : "form-control"}
                                           value={values.name} onChange={handleChange} onBlur={handleBlur} />

                                    {errors.name && touched.name && (
                                        <div className="input-feedback" style={{marginTop: '20px'}}>{errors.name}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Đường dẫn tĩnh</label>
                                    <input type="text" name="slug"
                                           placeholder={'Enter slug'}
                                           className={(errors.slug && touched.slug) ? "error" : "form-control"}
                                           value={values.slug}
                                           onChange={handleChange}
                                           onBlur={handleBlur} />
                                    {errors.slug && touched.slug && (
                                        <div className="input-feedback" style={{marginTop: '20px'}}>{errors.slug}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <button type="submit" disabled={isSubmitting}>
                                        Thêm danh mục
                                    </button>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}
export default ValidatedAddCategory;