import React from 'react';

export const Setting = () => {

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="col-md-12">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Setting Page</h3>
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Title Page</span>
                                </div>
                                <input type="text" className="form-control" name={'title_page'} placeholder="Enter your title web"/>
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Description Page</span>
                                </div>
                                <input type="text" className="form-control" name={'description_page'} placeholder="Enter your description web"/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Admin Email</span>
                                </div>
                                <input type="email" className="form-control" name={'admin_email'} placeholder="Enter your email"/>
                            </div>
                            <div className="input-group mb-3">
                                    <span className="input-group-text">User can register</span>

                                    <select className="form-control" name={'user_can_register'}>
                                        <option value={0}>No</option>
                                        <option value={1}>Yes</option>
                                    </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}