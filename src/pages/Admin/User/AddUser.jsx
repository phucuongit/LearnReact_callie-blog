import React, { useEffect, useContext} from 'react';
import {authenticate} from "../../../authenticate/authen";
import Context, {DashBoardContext} from "../../../Context";
import {Link} from "react-router-dom";
import ValidatedAddUser from '../../../components/ValidatedAddUser/ValidatedAddUser';

const AddUser = ({history}) => {
    let { isAuthenticated, setAuthenticated } = useContext(Context);

    useEffect(() => {
        onload();
    }, [isAuthenticated]);

    function onload(){
        if(authenticate() && isAuthenticated){
            history.push('/admin/add-user');
        }else{
            if(authenticate()){
                setAuthenticated(true);
                history.push('/admin/add-user');
            }else{
                history.push('/login');
            }
        }
    }
    function backPage(){
        history.push('/admin/users');
    }
    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>User Add</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">User Add</li>
                            </ol>
                        </div>
                    </div>
                </div>

            </section>


            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Information User</h3>

                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                                            data-toggle="tooltip" title="Collapse">
                                        <i className="fas fa-minus"/></button>
                                </div>
                            </div>
                            <div className="card-body">
                               <ValidatedAddUser history={history}/>
                              
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}
export default AddUser;