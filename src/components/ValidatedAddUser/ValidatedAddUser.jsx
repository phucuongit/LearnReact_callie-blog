import React, {useContext} from "react";
import { Formik } from "formik";
import axios from 'axios';
import {Link} from 'react-router-dom';
import * as EmailValidator from "email-validator";
import Cookies from 'js-cookie';
import * as Yup from "yup";
import Context from "../../Context";
import {DashBoardContext} from "../../Context";
import {add_user} from '../../action/actionCreators';
import {useReducer} from "reinspect";
import reducer, {initialState} from "../../reducers/reducer";
const ValidatedAddUser = ({appProps, history}) => {
    // const [state, dispatch] = useReducer(reducer, initialState);

    const [ state, dispatch ] = useContext(DashBoardContext);

    return (
            <div>

                <Formik initialValues={{name: '', email: '', password: '', c_password: '', roles: 0}}
                        onSubmit={(values, {setSubmitting}) => {

                                setTimeout(()=> {
                                    //xử lý add user

                                    try{
                                        axios.post('http://localhost:8000/api/register', values)
                                            .then(res => {
                                                if(typeof res.data.success.token != "undefined"){

                                                    dispatch(add_user(values));
                                                    setSubmitting(false);
                                                    history.push("/admin/users");
                                                }

                                            }).catch((error)=>{
                                                console.log(error);
                                                setSubmitting(true);
                                            });
                                    }catch(e){
                                        console.log(e);
                                    }
                                }, 500);
                            }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .required('required')
                                .min(2, "User name is to short - should be 2 chars minimum"),
                            email: Yup.string()
                                .email()
                                .required("required"),
                            password: Yup.string()
                                .required("required")
                                .min(8, "Passwork is to short - should be 8 chars minimum")
                                .matches(/(?=.*[0-9])/, "Password must contain a number."),
                            c_password: Yup.string()
                                .required('required')
                                .oneOf([Yup.ref('password'), null] , "Password mush match") ,
                            roles: Yup.string()
                                .required("required")
                                .matches(/0|1/, "Role should be admin or user"),
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
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email"
                                           placeholder={'Enter your email'}
                                           className={(errors.name && touched.name) ? "error" : "form-control"}
                                           value={values.email}
                                           onChange={handleChange}
                                           onBlur={handleBlur} />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback" style={{marginTop: '20px'}}>{errors.email}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDescription">Password</label>
                                    <input name="password"
                                           type="password"
                                           placeholder="Enter your password"
                                           value={values.password}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           className={ (errors.password && touched.password) ? "error" : "form-control"} />
                                    {errors.password && touched.password && (
                                        <div className="input-feedback" style={{marginTop: '20px'}}>{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDescription">Nhập lại password</label>
                                    <input name="c_password"
                                           type="password"
                                           placeholder="ReEnter your password"
                                           value={values.c_password}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           className={(errors.c_password && touched.c_password) ? "error" : "form-control"}/>
                                    {errors.c_password && touched.c_password && (
                                        <div className="input-feedback" style={{marginTop: '20px'}}>{errors.c_password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputStatus">Role</label>
                                    <select name='roles' className={(errors.roles && touched.roles) ? "error" : "form-control custom-select"}
                                               value={values.roles}
                                               onChange={handleChange}
                                               onBlur={handleBlur}>
                                        <option defaultValue={0} disabled>Select one</option>
                                        <option value={1}>Admin</option>
                                        <option value={0}>User</option>

                                    </select>
                                    {errors.roles && touched.roles && (
                                        <div className="input-feedback" style={{marginTop: '20px'}}>{errors.roles}</div>
                                    )}
                                    <Link to={'/admin/users'} className="btn btn-secondary">
                                        Cancel
                                    </Link>
                                    <button type="submit" disabled={isSubmitting}>
                                        Login
                                    </button>
                                </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}
export default ValidatedAddUser;