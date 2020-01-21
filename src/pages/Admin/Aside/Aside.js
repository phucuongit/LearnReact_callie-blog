import React, {useContext, useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import logiAdminLTE from './img/AdminLTELogo.png';
import User2 from './img/user2-160x160.jpg';
import {UserLoginContext} from "../../../Context";
import apiSent, {BASE_URL} from "../../../api/config";
import {user_fetching, user_success} from "../../../action/userActionCreators";
import {useReducer, useState} from "reinspect";
import {initialUserState, UserReducer} from "../../../reducers/UserReducer";
const Aside = () => {
    const [user, dispatchSetUser] = useReducer(UserReducer, initialUserState, 'CurrentUser');
    const {UserLogin} = useContext(UserLoginContext);
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
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={'/admin'} className="brand-link">
                <img src={logiAdminLTE} alt="AdminLTE Logo"
                     className="brand-image img-circle elevation-3"
                     style={{"opacity": ".8"}}/>
                <span className="brand-text font-weight-light">Hệ Thống Quản Lý</span>
            </Link>

            <div className="sidebar">

                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={image.images == null ? '/dist/img/avatar_user.png' : image.images}  className="img-circle elevation-2" alt="User Image"/>
                    </div>
                    <div className="info">
                        <Link to={'/admin/1'} className="d-block">
                            {(UserLogin !== null ) ? UserLogin.name : 'Loading' }
                        </Link>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">

                        <li className="nav-item has-treeview menu-open">
                            <NavLink exact to={'/admin'} className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact  to={'/admin/users'} className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Users
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-header">HANDLE POST</li>
                        <li className="nav-item">

                        </li>

                        <li className="nav-item">
                            <NavLink exact  to={'/admin/all-posts'}  className="nav-link">
                                <i className="nav-icon far fa-image"></i>
                                <p>
                                    All Posts
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact  to={'/admin/add-posts'}  className="nav-link">
                                <i className="nav-icon fas fa-calendar-alt"></i>
                                <p>
                                    Add Post
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact  to={'/admin/categories'}  className="nav-link">
                                <i className="nav-icon fas fa-calendar-alt"></i>
                                <p>
                                    Categories
                                </p>
                            </NavLink>
                        </li>

                        <li className="nav-header">SETTING</li>
                        <li className="nav-item"/>
                        <li className="nav-item">

                            <NavLink exact  to={'/admin/my-profile'}  className="nav-link">
                                <i className="nav-icon fas fa-user"> </i>
                                <p>
                                    My Profile
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">

                            <NavLink exact  to={'/admin/setting'}  className="nav-link">
                                <i className="nav-icon fas fa-cogs"></i>
                                <p>
                                    My setting
                                </p>
                            </NavLink>
                        </li>
                        {/*<li className="nav-item">*/}

                        {/*    <NavLink exact  to={'/admin/menus'}  className="nav-link">*/}
                        {/*        <i className="nav-icon fab fa-microsoft"></i>*/}
                        {/*        <p>*/}
                        {/*            Menu*/}
                        {/*        </p>*/}
                        {/*    </NavLink>*/}
                        {/*</li>*/}
                    </ul>
                </nav>

            </div>

        </aside>
    );
}
export default Aside;