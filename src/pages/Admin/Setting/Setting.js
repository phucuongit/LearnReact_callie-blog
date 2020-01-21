import React, {useContext, useEffect} from 'react';

import {DashBoardContext} from '../../../Context';
import apiSent, {BASE_URL} from '.././../../api/config';
import {fetchingSettings, successSettings, updateSettings} from '.././../../action/SettingActionCreators';
import {Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from 'toastr';
import Cookies from "js-cookie";
import {useState} from 'reinspect';
import Loader from '../../../components/Loader/Loader';

export const Setting = () => {
    let {settingsReducer} = useContext(DashBoardContext);
    let [settings, dispatchSettings] = settingsReducer;

    const [currentImage, setImage] = useState({isLoading: false, url: null});
    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        dispatchSettings(fetchingSettings());
        apiSent.get('/settings').then(res => {
            dispatchSettings(successSettings(res.data.success));
            if(res.data.success.footer_logo !== null){
                setImage({
                    url: BASE_URL + res.data.success.footer_logo,
                })
            }

        });
    }

    const handleChangeImage = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 1) {
            const msg = 'Only one image can be uploaded at a time';
            e.target.value = e.target.defaultValue;
            return toast.error(msg, {closeButton: true, timeOut: 5000})
        }
        if (files[0].size > 600000) { // 600 kb
            const msg = 'this image is too large';
            e.target.value = e.target.defaultValue;
            return toast.error(msg, {closeButton: true, timeOut: 5000})
        }
        setImage({
            ...currentImage,
            isLoading: true,
            url: URL.createObjectURL(files[0]),
        });
        const formData = new FormData();
        files.forEach((image_file) => {
            formData.append('file', image_file);
        });
        apiSent.post('/images/settings', formData).then(res => {

            setImage({
                ...currentImage,
                isLoading: false,
                url: URL.createObjectURL(files[0]),
            });
            toast.success('upload logo success', 'Successfully',  {closeButton: true, timeOut: 5000});
        }).catch(e => {
            setImage({
                ...currentImage,
                isLoading: false,
            });
            toast.error('Do not upload logo success', 'Successfully',  {closeButton: true, timeOut: 5000});
        });

    }
    const removeImage = () => {
        setImage({
            ...currentImage,
            uploading: false,
            url: null,
        });
        apiSent.delete(`http://localhost:8000/api/images/settings`).then(res => {

            toast.success('Delete logo success', 'Successfully',  {closeButton: true, timeOut: 5000});
        })
    }
    let response = settings.response;
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="col-md-12">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Setting Page</h3>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={(response !== null) ? {...response} : {title_page: '', description: '',twitter: '', google_plus: '', facebook: ''}}
                                enableReinitialize={true}
                                onSubmit={(values, {setSubmitting, setStatus, resetForm}) => {
                                    console.log(values);
                                    dispatchSettings(updateSettings(values));
                                    setTimeout(() => {
                                        try {
                                            apiSent.put('/settings', values).then(res => {
                                                toast.success('Your settings is updated', 'Success', {
                                                    closeDuration: 300,
                                                    closeButton: true
                                                });
                                            })
                                        } catch (errors) {
                                            toast.error('Have some error', 'Errors', {
                                                closeDuration: 300,
                                                closeButton: true
                                            });
                                            resetForm({});
                                            setStatus(false);
                                        }
                                    }, 500);
                                }}

                                validationSchema={Yup.object().shape({
                                    title_page: Yup.string()
                                        .required('required')
                                        .min(2, "Title is to short - should be 2 chars minimum"),
                                    description_page: Yup.string()
                                        .min(1, "page description is to short - should be 2 chars minimum"),
                                    twitter: Yup.string()
                                        .url('You should entern your url'),
                                    facebook: Yup.string()
                                        .url('You should entern your url'),
                                    google_plus: Yup.string()
                                        .url('You should entern your url'),
                                    footer_description: Yup.string()
                                        .min(1, "Footer description is to short - should be 2 chars minimum"),
                                    admin_email: Yup.string()
                                        .required("required")
                                        .email()
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

                                            <div className="input-group mb-3">
                                                <label className="">Title Page</label>
                                                <input type="text"
                                                       className={(errors.title_page && touched.title_page) ? "error" : "form-control"}
                                                       defaultValue={(response !== null) ? response.title_page : ''}
                                                       onChange={handleChange} onBlur={handleBlur}
                                                       name={'title_page'} placeholder="Enter your title web"/>
                                                {errors.title_page && touched.title_page && (
                                                    <div className="input-feedback"
                                                         style={{marginTop: '20px'}}>{errors.title_page}</div>
                                                )}
                                            </div>
                                            <div className="input-group mb-3">
                                                <label>Description Page</label>
                                                <textarea rows={5}
                                                          className={(errors.description_page && touched.description_page) ? "error" : "form-control"}
                                                          defaultValue={(response !== null) ? response.description_page : ''}
                                                          onChange={handleChange} onBlur={handleBlur}
                                                          name={'description_page'}
                                                          placeholder="Enter your description web"/>
                                                {errors.description_page && touched.description_page && (
                                                    <div className="input-feedback"
                                                         style={{marginTop: '20px'}}>{errors.description_page}</div>
                                                )}
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="">Facebook Link</label>
                                                <input type="text"
                                                       className={(errors.facebook && touched.facebook) ? "error" : "form-control"}
                                                       defaultValue={(response !== null) ? response.facebook : ''}
                                                       onChange={handleChange} onBlur={handleBlur}
                                                       name={'facebook'} placeholder="Enter your title web"/>
                                                {errors.facebook && touched.facebook && (
                                                    <div className="input-feedback"
                                                         style={{marginTop: '20px'}}>{errors.facebook}</div>
                                                )}
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="">Twitter Link</label>
                                                <input type="text"
                                                       className={(errors.twitter && touched.twitter) ? "error" : "form-control"}
                                                       defaultValue={(response !== null) ? response.twitter : ''}
                                                       onChange={handleChange} onBlur={handleBlur}
                                                       name={'twitter'} placeholder="Enter your title web"/>
                                                {errors.twitter && touched.twitter && (
                                                    <div className="input-feedback"
                                                         style={{marginTop: '20px'}}>{errors.twitter}</div>
                                                )}
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="">Google Plus</label>
                                                <input type="text"
                                                       className={(errors.google_plus && touched.google_plus) ? "error" : "form-control"}
                                                       defaultValue={(response !== null) ? response.google_plus : ''}
                                                       onChange={handleChange} onBlur={handleBlur}
                                                       name={'google_plus'} placeholder="Enter your title web"/>
                                                {errors.google_plus && touched.google_plus && (
                                                    <div className="input-feedback"
                                                         style={{marginTop: '20px'}}>{errors.google_plus}</div>
                                                )}
                                            </div>
                                            <div className="input-group mb-3">
                                                <label>Email Admin</label>
                                                <input rows={5}
                                                       className={(errors.admin_email && touched.admin_email) ? "error" : "form-control"}
                                                       defaultValue={(response !== null) ? response.admin_email : ''}
                                                       onChange={handleChange} onBlur={handleBlur}
                                                       name={'admin_email'}
                                                       placeholder="Enter your description web"/>
                                                {errors.admin_email && touched.admin_email && (
                                                    <div className="input-feedback"
                                                         style={{marginTop: '20px'}}>{errors.admin_email}</div>
                                                )}
                                            </div>
                                            <div className="input-group mb-3">
                                                <label>Footer Description</label>
                                                <input
                                                    className={(errors.footer_description && touched.footer_description) ? "error" : "form-control"}
                                                    defaultValue={(response !== null) ? response.footer_description : ''}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                    name={'footer_description'}
                                                    placeholder="Enter footer description"/>
                                                    {errors.footer_description && touched.footer_description && (
                                                        <div className="input-feedback"
                                                             style={{marginTop: '20px'}}>{errors.footer_description}</div>
                                                    )}
                                            </div>
                                            <div className="input-group mb-3">
                                                <label>Footer Logo</label>
                                                {currentImage.url === null ? (
                                                    <>
                                                        <input type={'file'}
                                                               accept={'image/gif, image/x-png, image/jpeg'}
                                                               className={"form-control"}
                                                               onChange={(e) => handleChangeImage(e)}
                                                               onBlur={handleBlur}
                                                               name={'footer_logo'}/>

                                                    </>
                                                ) : (
                                                    currentImage.isLoading ? <Loader/> : (
                                                    <div className="card-body" style={{"display": "block"}}>
                                                        <div
                                                            onClick={(e) => removeImage(e)}
                                                            className='btn--delete'
                                                        >
                                                            <i className="fas fa-minus-circle"></i>
                                                        </div>
                                                        <img src={currentImage.url}  className={'img-fluid'} style={{maxHeight: '300px'}} />
                                                    </div>)
                                                )}

                                            </div>
                                            <button type="submit">
                                                Save
                                            </button>
                                        </form>
                                    );
                                }}
                            </Formik>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}