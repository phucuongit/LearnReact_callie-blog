import React, {useEffect} from 'react';
import apiSent, {BASE_URL} from '../../../api/config';
import {UserReducer, initialUserState} from "../../../reducers/UserReducer";
import {useReducer, useState} from 'reinspect';
import {user_fetching, user_success, editUser_success} from '../../../action/userActionCreators';
import Loader from "../../../components/Loader/Loader";
import {Formik} from "formik";
import * as Yup from "yup";
import toastr from 'toastr';
import axios from "axios";
import Cookies from "js-cookie";
import toast from 'toastr';

const MyProfile = () => {

    const [user, dispatchSetUser] = useReducer(UserReducer, initialUserState, 'CurrentUser');
    const [isEdit, setEdit] = useState({isEditing: false, type: null});
    let [image , setImage] = useState({uploading: false, images:null});
    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        dispatchSetUser(user_fetching());
        apiSent.get('/details').then(res => {
            dispatchSetUser(user_success(res.data));
            if(res.data.success.avatar_id !== null){
                setImage({
                    images: BASE_URL + res.data.success.avatar_id,
                })
            }

        });
    }

    const handleEditState = (e) => {
        setEdit({
            ...isEdit,
            isEditing: !isEdit.isEditing,
            type: e.target.classList[2]
        });
    }
    const [response, setResponse] = useState({type: null, value: null})
    const handleSaveState = (e) => {
        dispatchSetUser(editUser_success(response.value));
        apiSent.put('/users', response.value).then(res => {
            toastr.success(res.data.success, res.statusText);
        }).catch(error => {
            toastr.error(error.response.data.error, error.response.statusText);
        });
        // console.log('save: ', response.value);
        setEdit({
            ...isEdit,
            isEditing: !isEdit.isEditing,
            type: e.target.classList[2]
        });
    }

    const handleChangeState = (e) => {
        setResponse({
            ...response,
            value: {...response.value, [e.target.name]: e.target.value}
        })

    }

    /*
    * Handle Upload photo
    * */

    const selectPhoto = () => {
        document.getElementById('selectPhoto').click();
    }
    const updateImage = (e, userId) => {
        const files = Array.from(e.target.files);
        if(files.length > 1){
            const msg = 'Only one image can be uploaded at a time';
            e.target.value = e.target.defaultValue;
            return toast.error(msg, {closeButton:true, timeOut: 5000})
        }
        if(files[0].size > 600000){ // 600 kb
            const msg = 'this image is too large';
            e.target.value = e.target.defaultValue;
            return toast.error(msg, {closeButton:true, timeOut: 5000})
        }
        setImage({
            ...image,
            uploading: true,
            images: URL.createObjectURL(e.target.files[0])
        });

        //upload image

        const formData = new FormData();
        files.forEach((image_file) => {
            formData.append('file', image_file);
            formData.append('user_id', userId);
        });
        apiSent.post('/images/users', formData).then(res => {
            setImage({
                ...image,
                uploading: false,
                images: URL.createObjectURL(files[0])
            });
        }).catch(e => console.log(e));

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

                                        {isEdit.isEditing && isEdit.type === 'username' ? (
                                            <>
                                            <div className="text-center">
                                                {image.uploading ? <Loader/> : (
                                                    <img className="profile-user-img img-fluid img-circle"
                                                         src={image.images == null ? '/dist/img/avatar_user.png' : image.images}
                                                         alt="User profile picture"/>
                                                )}

                                                <label>Your Avatar</label>
                                                <input type={'file'} style={{display: 'none'}} onChange={(e) => updateImage(e, user.response.success.id)} id={'selectPhoto'} name={'avatar_user'} accept={'image/png, image/x-png, image/gif, image/jpeg, image/jpg'}/>
                                                <button type={'button'}  onClick={selectPhoto} className={'btn btn-primary'}>Select photo</button>
                                            </div>
                                            <h3 className="profile-username text-center"><input
                                                defaultValue={user.response.success.name} name={'username'}
                                                onChange={(e) => handleChangeState(e)} className={'form-control'}/>
                                                <i className="far fa-save username"
                                                   onClick={(e) => handleSaveState(e)}/></h3>

                                            </>
                                        ) : (
                                            <>
                                            <div className="text-center">
                                                <img className="profile-user-img img-fluid img-circle"
                                                     src={image.images == null ? '/dist/img/avatar_user.png' : image.images}
                                                     alt="User profile picture"/>
                                            </div>
                                            <h3 className="profile-username text-center">{user.response.success.name} <i
                                                className="fas fa-edit username" onClick={(e) => handleEditState(e)}/>
                                            </h3>
                                            </>
                                        )}


                                        {user.response.success.profile !== null && (
                                            <p className="text-muted text-center">{user.response.success.profile.location}</p>
                                        )}
                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b>Total Post</b> <a
                                                className="float-right">{user.response.count_post}</a>
                                            </li>

                                        </ul>
                                        {user.response.success.roles.map((role, index) => {
                                            return <a key={index}
                                                      className="btn btn-primary btn-block"><b>{role.name}</b></a>
                                        })}

                                    </div>

                                </div>

                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">About Me</h3>
                                    </div>
                                    <div className="card-body">

                                        <strong><i className="fas fa-book mr-1"></i> Education</strong>

                                        {
                                            isEdit.isEditing && isEdit.type === 'education' ? (
                                                <i className="far fa-save education float-right"
                                                   onClick={(e) => handleSaveState(e)}/>

                                            ) : (
                                                <i className="fas fa-edit education float-right"
                                                   onClick={(e) => handleEditState(e)}/>
                                               )
                                        }
                                        <p className="text-muted">
                                            {isEdit.isEditing && isEdit.type === 'education' ? (
                                                <input defaultValue={user.response.success.profile.education}
                                                       name={'education'} onChange={(e) => handleChangeState(e)}
                                                       className={'form-control'}/>
                                            ) : (
                                                user.response.success.profile.education
                                            )}
                                        </p>
                                        <hr/>

                                        <strong><i
                                            className="fas fa-map-marker-alt mr-1"></i> Location</strong>
                                        {
                                            isEdit.isEditing && isEdit.type === 'location' ? (
                                                <i className="far fa-save location float-right"
                                                   onClick={(e) => handleSaveState(e)}/>

                                            ) : (
                                                <i className="fas fa-edit location float-right"
                                                   onClick={(e) => handleEditState(e)}/>
                                            )
                                        }
                                        <p className="text-muted">
                                            {isEdit.isEditing && isEdit.type === 'location' ? (
                                                <input defaultValue={user.response.success.profile.location}
                                                       name={'location'} onChange={(e) => handleChangeState(e)}
                                                       className={'form-control'}/>
                                            ) : (
                                                user.response.success.profile.location
                                                )}
                                        </p>
                                        <hr/>

                                        <strong><i className="fas fa-pencil-alt mr-1"></i> Skills</strong>
                                        {
                                            isEdit.isEditing && isEdit.type === 'skills' ? (
                                                <i className="far fa-save skills float-right"
                                                   onClick={(e) => handleSaveState(e)}/>

                                            ) : (
                                                <i className="fas fa-edit skills float-right"
                                                   onClick={(e) => handleEditState(e)}/>
                                            )
                                        }
                                        <p className="text-muted">
                                            {isEdit.isEditing && isEdit.type === 'skills' ? (
                                                <>
                                                <input defaultValue={user.response.success.profile.DSkill}
                                                       name={'skills'} onChange={(e) => handleChangeState(e)}
                                                       className={'form-control'}/>
                                                       <span>Nhập các skill ngăn cách bởi dấu ,</span>
                                                </>
                                            ) : (
                                                user.response.success.profile.DSkill !== null && (
                                                    user.response.success.profile.DSkill.map((skill,index) => {
                                                        return <span key={index} className="tag tag-danger">{skill} {(index === user.response.success.profile.DSkill.length -1) ? '' : ','}</span>
                                                    })
                                                ))}
                                        </p>
                                        <hr/>

                                    </div>

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
                                                        <label htmlFor="inputEmail"
                                                               className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" disabled={true}
                                                                   value={user.response.success.email}
                                                                   className="form-control" id="inputEmail"
                                                                   placeholder="Email"/>
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