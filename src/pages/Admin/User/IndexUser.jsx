import React , {useEffect, useContext}from 'react';
import Context from "../../../Context";
import {authenticate} from "../../../authenticate/authen";
import useApiRequest from "../../../hooks";
import {DashBoardContext} from '../../../Context';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import {FETCHING, SUCCESS, DELETE_USER , ADD_USER, EDIT_USER} from "../../../action/actionTypes";
import axios from 'axios';
import {useState} from 'reinspect';
import toastr from 'toastr';
import reducer, {initialState} from "../../../reducers/reducer";
import {updateUser} from '../../../action/userActionCreators';
import apiSent from '../../../api/config';

const IndexUser = ({history}) => {
    let { isAuthenticated,setAuthenticated } = useContext(Context);
    const [ isEditing, setEditing ] = useState({edit: false, id: ''});
    const [ user , setUser ] = useState({name: '', roles: '' });
    useEffect(() => {
        onload();
    }, [isAuthenticated]);

    function onload(){
        if(authenticate() && isAuthenticated ){
            history.push('/admin/users');
        }else{
            if(authenticate()){
                setAuthenticated(true);
                history.push('/admin/users');
            }else{
                history.push('/login');
            }
        }
    }

    const [ state, dispatch ] = useContext(DashBoardContext);

    const [{status , response}, makeRequest] = useApiRequest('http://localhost:8000/api/users', {verb: 'GET', params:  {Authorization: Cookies.get('access_token')} });

    var users = [];
    try{
        if(response.data.success.length > 0 ){
            users = response.data.success;
        }else{
            toastr.error(response.data.error, 'Error Get ALL User', {closeButton: true, closeDuration: 300});
        }
    }catch(e){

    }
    const deleteUser = (id) => e => {
            dispatch({type: 'DELETE_USER',response , id});
            if(response.status === 200){
                axios({ method: "delete", url: `http://localhost:8000/api/users/${id}`, headers: {Authorization: Cookies.get('access_token')} })
                    .then(res => alert('user is deleted'));
            }

        }
    ;
    let [roles, setRoles ] = useState(null);

    const editUser = (id) => e => {
        setEditing({...isEditing,
            edit: !isEditing.edit,
            id: id
        });
        apiSent.get('/roles').then(res=> {
            setRoles(res.data.success);
        }).catch(e => {
           toastr.error(e, 'Error Get Roles');
        });

    }
    const saveUser = (id, user) => e => {
        setEditing({...isEditing,
            edit: !isEditing.edit,
            id: id
        });
        dispatch(updateUser({id,...user}));
        toastr.success('This user is successfully edited', 'Edit User');
        apiSent({
            url: `/users/${id}`,
            method: 'PUT',
            data: {id,...user},
        }).catch(e => {
            toastr.error(e, 'Error Get Roles');
        });
    }
    const handleChangeState = (e, preUser) => {
        const {name , value } = e.target;
        if(name === 'roles'){
            setUser({
                name: preUser.name,
                roles: value
            });

        }else if(name === 'name'){
            setUser({
                name: value,
                roles: preUser.roles,
            });
        }

    }

    return (

        <div className="content-wrapper">
            { isAuthenticated === true && (
                <>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Projects</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Projects</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                    </section>

                    <button className={'btn btn-success'} onClick={makeRequest}>GET all user</button>
                    <Link to={'/admin/add-user'}>
                        <button className={'btn btn-primary'}>Add new user</button>
                    </Link>

                    <div id={'alertNotifine'}/>
                    <section className="content">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Projects</h3>

                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                                            data-toggle="tooltip" title="Collapse">
                                        <i className="fas fa-minus"/></button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove"
                                            data-toggle="tooltip" title="Remove">
                                        <i className="fas fa-times"/></button>
                                </div>
                            </div>

                            <div className="card-body p-0">
                                <table className="table table-striped projects">
                                    <thead>
                                    <tr>
                                        <th style={{"width": "1%"}}>
                                            #
                                        </th>
                                        <th style={{"width": "20%"}}>
                                            Project Name
                                        </th>
                                        <th style={{"width": "20%"}}>
                                            Avatar
                                        </th>
                                        <th style={{"width": "20%"}}>
                                            Email
                                        </th>
                                        <th>
                                            Project Progress
                                        </th>
                                        <th style={{"width": "8%"}} className="text-center">
                                            Roles
                                        </th>
                                        <th style={{"width": "20%"}}>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {status === FETCHING && (
                                        <tr>
                                            <td>
                                                #
                                            </td>
                                            <td>
                                                <a>
                                                    Loading
                                                </a>
                                                <br/>
                                                <small>
                                                    Loading
                                                </small>
                                            </td>

                                        </tr>
                                    )}


                                    {status === SUCCESS && (users != null) && (
                                        users.map((currentVal) => {

                                            return  (
                                                <tr key={currentVal.id}>
                                                    <td>
                                                        {currentVal.id}
                                                    </td>
                                                    <td>
                                                        { (isEditing.edit &&  isEditing.id === currentVal.id ) ?
                                                            (
                                                                <input defaultValue={currentVal.name} name='name' placeholder={'Enter your name'} onChange={(e) => handleChangeState(e,currentVal)} />
                                                            ) :
                                                            (
                                                                <>
                                                                    <a>
                                                                        {currentVal.name}
                                                                    </a>
                                                                    <br/>
                                                                </>
                                                            )
                                                        }


                                                        <small>
                                                            Created  {currentVal.updated_at}
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item">
                                                                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png"/>
                                                            </li>

                                                        </ul>
                                                    </td>
                                                    <td>
                                                        { (isEditing.edit &&  isEditing.id === currentVal.id )  ?
                                                            (
                                                                <input defaultValue={currentVal.email} name='email' placeholder={'Enter your email'} disabled />
                                                            ) :
                                                            (
                                                                currentVal.email
                                                            )
                                                        }
                                                    </td>
                                                    <td className="project_progress">
                                                        <div className="progress progress-sm">
                                                            <div className="progress-bar bg-green" role="progressbar" aria-valuenow="57"
                                                                 aria-valuemin="0" aria-valuemax="100" style={{"width": "57%"}}>
                                                            </div>
                                                        </div>
                                                        <small>
                                                            57% Complete

                                                        </small>
                                                    </td>
                                                    <td className="project-state">
                                                        { (isEditing.edit &&  isEditing.id === currentVal.id )  ?
                                                            (
                                                                <select name='roles' className={"form-control custom-select"}
                                                                        onChange={(e) => handleChangeState(e, currentVal)}
                                                                >
                                                                    <option defaultValue={''} disabled>Select one</option>
                                                                    { roles !== null &&
                                                                        roles.map( (role, index) => (<option key={index} value={role}>{role}</option>))
                                                                    }
                                                                </select>
                                                            )
                                                            : (
                                                                currentVal.roles.map((role, index) => ( <span key={index} className="badge badge-success"> {role.slug }</span>))
                                                            )

                                                        }
                                                    </td>
                                                    <td className="project-actions text-right">
                                                        { (isEditing.edit &&  isEditing.id === currentVal.id )  ?
                                                            ( <a className="btn btn-info btn-sm" onClick={saveUser(currentVal.id, { name: currentVal.name, roles: currentVal.roles, ...user })}>
                                                                    <i className="fas fa-pencil-alt">
                                                                    </i>
                                                                    Save
                                                                </a>
                                                            ) :
                                                            (
                                                                <a className="btn btn-info btn-sm" onClick={editUser(currentVal.id)}>
                                                                    <i className="fas fa-pencil-alt">
                                                                    </i>
                                                                    Edit
                                                                </a>
                                                            )
                                                        }

                                                        <a className="btn btn-danger btn-sm"  onClick={deleteUser(currentVal.id)}>
                                                            <i className="fas fa-trash">
                                                            </i>
                                                            Delete
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })



                                    )}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </section>
                </>
            )}
        </div>

    );
}
export default  IndexUser;