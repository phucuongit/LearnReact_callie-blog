import React , {useEffect }from "react";
import Cookies from 'js-cookie';
export const LogoutHandler = (props ) => {
    const history = props.history;
    useEffect(
            () => {
                if(!Cookies.get('access_token')){
                    history.push('/login');
                }else{
                    Cookies.remove("access_token");
                    alert('Logging out success');
                    props.setAuthenticated(false);
                    history.push("/login");
                }

            },
            [history]
        );

    return <div/>;
};