import React, {Component} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Cookies from "js-cookie";
import ValidateContactMail from '../ValidateContactMail/ValidateContactMail';

class Contact extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (

            <div>
                <Formik initialValue={{email: '',subject: '', message: ''}}
                        onSubmit={ (values, {setSubmitting}) => {
                            setTimeout( () => {
                                try{
                                    axios.post('http://localhost:8000/api/login', values, {
                                        headers: { 'Access-Control-Allow-Origin': "http://localhost:3000/",
                                            'Access-Control-Allow-Methods': 'POST',
                                            'Content-Type': 'application/json',
                                            'Access-Control-Allow-Credentials': 'true',
                                        }
                                    }).then(res =>{
                                        const AUTH_TOKEN = res.data.success.token;
                                        Cookies.set('access_token', 'Bearer ' + AUTH_TOKEN, {expires: 7});
                                        setSubmitting(false);
                                    }).catch((error)=>{
                                        console.log(error);
                                    });
                                }catch(errors){
                                    console.log(errors);
                                }
                            }, 500)
                        }}
                >

                </Formik>
                <div className="section-row">
                    <div className="section-title">
                        <h2 className="title">Contact Information</h2>
                    </div>
                    <p>Malis debet quo et, eam an lorem quaestio. Mea ex quod facer decore, eu nam mazim postea. Eu
                        deleniti pertinacia ius. Ad elitr latine eam, ius sanctus eleifend no, cu primis graecis
                        comprehensam eum. Ne vim prompta consectetuer, etiam signiferumque ea eum.</p>
                    <ul className="contact">
                        <li><i className="fa fa-phone"></i> 202-555-0194</li>
                        <li><i className="fa fa-envelope"></i> <a href="#">callie@email.com</a></li>
                        <li><i className="fa fa-map-marker"></i> 123 6th St.Melbourne, FL 32904</li>
                    </ul>
                </div>


                <div className="section-row">
                    <div className="section-title">
                        <h2 className="title">Mail us</h2>
                    </div>
                    <ValidateContactMail/>
                </div>
            </div>
        );
    }
}

export default Contact;