import React, {useEffect} from 'react';
import apiSent from '../../../api/config';
import {UserReducer, initialUserState} from "../../../reducers/UserReducer";
import {useReducer} from 'reinspect';
import {user_fetching, user_success} from '../../../action/userActionCreators';
import Loader from "../../../components/Loader/Loader";
import {Formik} from "formik";
import * as Yup from "yup";
import toastr from 'toastr';

const MyProfile = () => {

    const [user, dispatchSetUser] = useReducer(UserReducer, initialUserState, 'CurrentUser');
    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        dispatchSetUser(user_fetching());
        apiSent.get('/details').then(res => {
            dispatchSetUser(user_success(res.data));
        });
    }

    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Profile</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">User Profile</li>
                            </ol>
                        </div>
                    </div>
                </div>

            </section>


            <section className="content">
                <div className="container-fluid">
                    {user.response !== null ? (
                        <div className="row">

                            <div className="col-md-3">

                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            <img className="profile-user-img img-fluid img-circle"
                                                 src="../../dist/img/user4-128x128.jpg"
                                                 alt="User profile picture"/>
                                        </div>

                                        <h3 className="profile-username text-center">{user.response.success.career}</h3>
                                        {user.response.success.profile.location !== null && (
                                            <p className="text-muted text-center">{user.response.success.profile.location}</p>
                                        )}
                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b>Total Post</b> <a
                                                className="float-right">{user.response.count_post}</a>
                                            </li>

                                        </ul>
                                        {user.response.success.roles.map((role, index) => {
                                            return <a className="btn btn-primary btn-block"><b>{role.name}</b></a>
                                        })}

                                    </div>

                                </div>

                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">About Me</h3>
                                    </div>
                                    {user.response.success.profile !== null && (
                                        <div className="card-body">
                                            {user.response.success.profile.education !== null && (
                                                <>
                                                    <strong><i className="fas fa-book mr-1"></i> Education</strong>
                                                    <p className="text-muted">
                                                        {user.response.success.profile.education}
                                                    </p>
                                                    <hr/>
                                                </>

                                            )}

                                            {user.response.success.profile.location !== null && (
                                                <>
                                                    <strong><i
                                                        className="fas fa-map-marker-alt mr-1"></i> Location</strong>
                                                    <p className="text-muted">
                                                        {user.response.success.profile.location}
                                                    </p>
                                                    <hr/>
                                                </>
                                            )}

                                            {user.response.success.profile.skills !== "'{}'" && (
                                                <>
                                                    <strong><i className="fas fa-pencil-alt mr-1"></i> Skills</strong>
                                                    <p className="text-muted">
                                                        <span className="tag tag-danger">UI Design</span>
                                                        {user.response.success.profile.skills}
                                                    </p>
                                                    <hr/>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header p-2">
                                        <ul className="nav nav-pills">

                                            <li className="nav-item active"><a className="nav-link active"
                                                                               href="#settings"
                                                                               data-toggle="tab">Settings</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#account"
                                                                        data-toggle="tab">Account</a></li>
                                        </ul>
                                    </div>

                                    <div className="card-body">
                                        <div className="tab-content">


                                            <div className="active tab-pane" id="settings">
                                                <form className="form-horizontal">
                                                    <div className="form-group row">
                                                        <label htmlFor="inputName"
                                                               className="col-sm-2 col-form-label">Name</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" defaultValue={user.response.success.name}
                                                                   className="form-control" id="inputName"
                                                                   placeholder="Name"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputEmail"
                                                               className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" disabled={true}
                                                                   value={user.response.success.email}
                                                                   className="form-control" id="inputEmail"
                                                                   placeholder="Email"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputExperience"
                                                               className="col-sm-2 col-form-label">Education</label>
                                                        <div className="col-sm-10">
                                                        <textarea defaultValue={user.response.success.profile.education}
                                                                  className="form-control" id="inputExperience"
                                                                  placeholder="Experience"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputSkills"
                                                               className="col-sm-2 col-form-label">Location</label>
                                                        <div className="col-sm-10">
                                                            <select defaultValue={1} className="form-control"
                                                                    id="location">
                                                                <option value={2}>Viet Nam</option>
                                                                <option value={1}>USA</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputSkills"
                                                               className="col-sm-2 col-form-label">Skills</label>
                                                        <div className="col-sm-10">
                                                            <input type="text"
                                                                   defaultValue={user.response.success.profile.skills}
                                                                   className="form-control" id="skills"
                                                                   placeholder="Skills"/>
                                                        </div>
                                                    </div>


                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <button type="submit" className="btn btn-danger">Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="tab-pane" id="account">
                                                <Formik
                                                    initialValues={{
                                                        oldPassword: '',
                                                        newPassword: '',
                                                        c_newPassword: ''
                                                    }}
                                                    onSubmit={(values, {isSubmitting, setStatus, resetForm}) => {

                                                        apiSent.put('/details/users', values).then(res => {

                                                                toastr.success(res.data.success, res.statusText);
                                                                resetForm({});
                                                        }).catch(error => {
                                                                toastr.error(error.response.data.error, error.response.statusText);
                                                                resetForm({});
                                                        })

                                                    }}
                                                    validationSchema={Yup.object().shape({
                                                        oldPassword: Yup.string().required("No password provided.").min(8, "Password is too short - should be 8 chars minimum.")
                                                            .matches(/(?=.*[0-9])/, "Password must contain a number."),
                                                        newPassword: Yup.string().required("No new password provided.").min(8, "Password is too short - should be 8 chars minimum.")
                                                            .matches(/(?=.*[0-9])/, "Password must contain a number."),
                                                        c_newPassword: Yup.string().required("No new password provided.")
                                                            .oneOf([Yup.ref('newPassword'), null], "Password mush match"),
                                                    })}>
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
                                                            <form className="form-horizontal" onSubmit={handleSubmit}>
                                                                <div className="form-group row">
                                                                    <label htmlFor="inputName"
                                                                           className="col-sm-2 col-form-label">Old
                                                                        Password</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="password" name='oldPassword'
                                                                               placeholder="Old Password"
                                                                               value={values.oldPassword}
                                                                               className={(errors.oldPassword && touched.oldPassword) ? "error" : "form-control"}
                                                                               onChange={handleChange}
                                                                               onBlur={handleBlur}
                                                                        />
                                                                        {errors.oldPassword && touched.oldPassword && (
                                                                            <div className="input-feedback"
                                                                                 style={{marginTop: '20px'}}>{errors.oldPassword}</div>
                                                                        )}
                                                                    </div>

                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="inputName"
                                                                           className="col-sm-2 col-form-label">New
                                                                        Password</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="password" name={'newPassword'}
                                                                               placeholder="New Password"
                                                                               value={values.newPassword}
                                                                               className={(errors.newPassword && touched.newPassword) ? "error" : "form-control"}
                                                                               onChange={handleChange}
                                                                               onBlur={handleBlur}
                                                                        />

                                                                        {errors.newPassword && touched.newPassword && (
                                                                            <div className="input-feedback"
                                                                                 style={{marginTop: '20px'}}>{errors.newPassword}</div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="inputName"
                                                                           className="col-sm-2 col-form-label">ReType
                                                                        New
                                                                        Password</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="password"
                                                                               name={'c_newPassword'}
                                                                               placeholder="ReNew Password"
                                                                               value={values.c_newPassword}
                                                                               className={(errors.c_newPassword && touched.c_newPassword) ? "error" : "form-control"}
                                                                               onChange={handleChange}
                                                                               onBlur={handleBlur}
                                                                        />
                                                                        {errors.c_newPassword && touched.c_newPassword && (
                                                                            <div className="input-feedback"
                                                                                 style={{marginTop: '20px'}}>{errors.c_newPassword}</div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <div className="offset-sm-2 col-sm-10">
                                                                        <button type="submit"
                                                                                className="btn btn-danger">Submit
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        )
                                                    }}
                                                </Formik>

                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    ) : <Loader/>}


                </div>

            </section>

        </div>
    );
}
export default MyProfile;