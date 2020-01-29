import React, {useContext, useEffect, useRef} from 'react';
import './header.css';
import {useState} from 'reinspect';
import logo from '../../issets/img/logo.png';
import post_10 from '../../issets/img/post-10.jpg';
import post_5 from '../../issets/img/post-5.jpg';
import post_12 from '../../issets/img/post-12.jpg';
import post_13 from '../../issets/img/post-13.jpg';
import sentApi from '../../api/config';
import {BrowserRouter as Link, NavLink} from 'react-router-dom';
import {UserLoginContext} from "../../Context";
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import Cookies from 'js-cookie';

const Header = ({UserLogin, appProps, menu}) => {
    let [isAdmin, setIsAdmin] = useState(false);
    let [menuTop, setMenuTop] = useState(null);
    const {isAuthenticated, setAuthenticated} = appProps;

    function useIsMountedRef() {
        const isMountedRef = useRef(null);
        useEffect(() => {
            isMountedRef.current = true;
            return () => isMountedRef.current = false;
        });
        return isMountedRef;
    }

    const isMountedRef = useIsMountedRef();
    useEffect(() => {
        // sentApi.get('/menus/filter?menu_type=mainMenu').then(res => {
        //     if (isMountedRef.current) {
        //         setMenuTop(res.data.success);
        //     }
        // }).catch(e => console.log(e));
        let userRole = null;
        if (Cookies.get('user_login')) {
            let userRole = JSON.parse(Cookies.get('user_login'));
        }

        if (userRole !== null) { // do để ở ngoài useEfect , khi state thay đổi lại render cái này lại nên lỗi many render react
            checkAdmin(userRole.roles);
        }
    }, [isMountedRef]);


    function checkAdmin(roles) {
        roles.forEach((role, index) => {
            if (role.slug === 'admin') {
                setIsAdmin(true);
            }
        });
    }
    return (
        <header id="header">

            <div id="nav">

                <div id="nav-top">
                    <div className="container">


                        <div className="nav-logo">
                            <NavLink to="/" exact>
                                <img src={logo} alt=""/>
                            </NavLink>
                        </div>

                        <div className="nav-btns">
                            {isAuthenticated ?
                                <>
                                    {isAdmin && (
                                        <span><NavLink exact to="/admin" style={{color: '#0D65D9'}}>DashBoard</NavLink></span>
                                    )}
                                    <button className="aside-btn"><NavLink exact to="/logout">Logout</NavLink></button>
                                </>
                                :
                                <>
                                    <button className="aside-btn"><NavLink exact to="/login">Login</NavLink></button>
                                </>
                            }


                            <button className="search-btn"><i className="fa fa-search"/></button>
                            <div id="nav-search">
                                <form>
                                    <input className="input" name="search" placeholder="Enter your search..."/>
                                </form>
                                <button className="nav-close search-close">
                                    <span/>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="nav-bottom">
                    <div className="container">

                        <ul className="nav-menu">
                            {menu !== null && (
                                menu.map((menu, index) => {
                                    return (<DropDownMenu key={index} menu={menu}/>);
                                })
                            )}
                        </ul>

                    </div>
                </div>

                <div id="nav-aside">
                    <ul className="nav-aside-menu">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li className="has-dropdown"><a>Categories</a>
                            <ul className="dropdown">
                                <li><a href="#">Lifestyle</a></li>
                                <li><a href="#">Fashion</a></li>
                                <li><a href="#">Technology</a></li>
                                <li><a href="#">Travel</a></li>
                                <li><a href="#">Health</a></li>
                            </ul>
                        </li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contacts</a></li>
                        <li><a href="#">Advertise</a></li>
                    </ul>
                    <button className="nav-close nav-aside-close"><span/></button>
                </div>

            </div>

        </header>
    );
}

export default Header;