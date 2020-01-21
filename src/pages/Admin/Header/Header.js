import {Link, NavLink} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import Cookies from 'js-cookie';
import Context, {UserLoginContext} from '../../../Context';
import 'bootstrap/dist/js/bootstrap.min';
import {channel, makeNotification} from "../../../components/Notification/Notification";
import {useState} from "reinspect";
import HtmlParser from "react-html-parser";
import toastr from 'toastr';
import sentApi from '../../../api/config';

const Header = ({history}) => {
    let {setAuthenticated} = useContext(Context);
    const {setUserLogin} = useContext(UserLoginContext);
    const [notifications , setNotify] = useState([]);

    let merge = [];
    useEffect(() => {
        sentApi.get('/notifications').then(res => {
            let data = [];
            res.data.success.map((item, index) => {
                item.data.id   = item.id;
                item.data.type = item.type;
                merge.push(item.data);
            })
            setNotify(merge);
        }).catch(e => {
            console.log(e.response.statusText);
        });
        channel.bind("Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", function(data) {
            merge.push(data);
            setNotify([...merge]);
            // console.log(notifications);
            // makeNotification(JSON.stringify(data));
        });
    }, []);

    function LogoutHandler() {
        if (Cookies.get('access_token')) {
            Cookies.remove('access_token');
            Cookies.remove('user_login');
            toastr.success('Logging out successful');
            setUserLogin(null);
            setAuthenticated(false);
            history.push("/login");
        }
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to={'/admin'} className="nav-link">
                        Home
                    </Link>

                </li>
            </ul>
            <form className="form-inline ml-3">
                <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search"
                           aria-label="Search"/>
                    <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                            <i className="fas fa-search"/>
                        </button>
                    </div>
                </div>
            </form>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink exact to="/" target={'_blank'} style={{color: '#0D65D9', display: 'flex', 'align-items': 'center', height: '100%'}}>View Blog</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments"/>
                        {notifications.length > 0 && (
                            <span className="badge badge-danger navbar-badge">{notifications.length}</span>
                        )}

                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => {
                                return makeNotification(notification, index)
                            })
                        ) : (
                            <div className="media" style={{padding: '5px 20px'}}>
                                <div className="media-body">
                                        Dont't have anything
                                </div>
                            </div>
                        )}
                            <div className="dropdown-divider"></div>

                    </div>
                </li>


                <li className="nav-item">

                    <a data-widget="control-sidebar" data-slide="true" className="nav-link" onClick={LogoutHandler}>
                        <i className="fas fa-sign-out-alt">Logout</i>
                    </a>

                </li>
            </ul>
        </nav>
    );
}
export default Header;