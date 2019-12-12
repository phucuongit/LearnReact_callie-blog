import React, {Component} from 'react';
import ValidatedLoginForm from '../../components/ValidatedLoginForm';
import Cookies from 'js-cookie';
import {Redirect } from 'react-router-dom';
class Login extends Component {
    constructor(props){
        super(props);
    }

    render() {

        var { isAuthenticated, setAuthenticated } = this.props;
        return (
            <div>
                <ValidatedLoginForm appProps={{isAuthenticated,setAuthenticated }}{...this.props}/>
            </div>
        );
    }
}

export default (Login);