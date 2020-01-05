import React, {useContext} from "react";
import {Link} from "react-router-dom";
import logiAdminLTE from './img/AdminLTELogo.png';
import User2 from './img/user2-160x160.jpg';
import {UserLoginContext} from "../../../Context";
const Aside = () => {
    const {UserLogin, setUserLogin} = useContext(UserLoginContext);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={'/admin/1'} className="brand-link">
                <img src={logiAdminLTE} alt="AdminLTE Logo"
                     className="brand-image img-circle elevation-3"
                     style={{"opacity": ".8"}}/>
                <span className="brand-text font-weight-light">Hệ Thống Quản Lý</span>
            </Link>

            <div className="sidebar">

                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={User2} className="img-circle elevation-2" alt="User Image"/>
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
                            <Link to={'/admin'} className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/admin/users'} className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Users
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-header">HANDLE POST</li>
                        <li className="nav-item">

                        </li>

                        <li className="nav-item has-treeview">
                            <Link to={'/admin/all-posts'}  className="nav-link">
                                <i className="nav-icon far fa-image"></i>
                                <p>
                                    All Posts
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </Link>

                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={'/admin/add-posts'}  className="nav-link">
                                        <i className="nav-icon fas fa-calendar-alt"></i>
                                        <p>
                                            Add Post
                                            <span className="badge badge-info right">2</span>

                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/admin/categories'}  className="nav-link">
                                        <i className="nav-icon fas fa-calendar-alt"></i>
                                        <p>
                                            Categories
                                            <span className="badge badge-info right">2</span>

                                        </p>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-header">SETTING</li>
                        <li className="nav-item"/>
                        <li className="nav-item has-treeview">

                            <Link to={'/admin/my-profile'}  className="nav-link">
                                <i className="fas fa-user"> </i>
                                <p>
                                    My Profile
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item has-treeview">

                            <Link to={'/admin/setting'}  className="nav-link">
                                <i className="fas fa-user"> </i>
                                <p>
                                    My setting
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>

        </aside>
    );
}
export default Aside;