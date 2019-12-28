import React, {useContext, useEffect} from "react";
import Cookies from 'js-cookie';
import {UserLoginContext} from "../../Context";
export const LogoutHandler = (props ) => {
    const history = props.history;
    const {UserLogin, setUserLogin} = useContext(UserLoginContext);
    useEffect(
            () => {
                if(!Cookies.get('access_token')){
                    history.push('/login');
                }else{
                    Cookies.remove("access_token");
                    Cookies.remove('user_login');
                    alert('Logging out success');
                    props.setAuthenticated(false);
                    setUserLogin( null);
                    history.push("/login");
                }

            },
            [history]
        );

    return <div/>;
};