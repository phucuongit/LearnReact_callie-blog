import React, {useEffect, useContext} from 'react';
import ValidatedLoginForm from '../../components/ValidatedLoginForm';
import {authenticate} from '../..//authenticate/authen';
import Context from '../../Context';

function Login({history}, props) {
    let { isAuthenticated,setAuthenticated } = useContext(Context);

    useEffect(() => {
        onload(isAuthenticated);
    }, [isAuthenticated]);

    function onload(isAuthenticated){
        if (authenticate() && isAuthenticated) { // nếu vừa có isAuthenticated vừa có cookie thì chuyển trang
            history.push('/');
        }else{
            if (authenticate()) { // nếu không có isAuthenticated nhưng cố cookie thì set lại isAuthenticated:true
                setAuthenticated(authenticate());
                history.push('/');
            }else{
                setAuthenticated(false);
            }
        }
    }

    return (

            <div>
                <ValidatedLoginForm appProps={{isAuthenticated,setAuthenticated }}{...props}/>
            </div>

    )
}

export default (Login);