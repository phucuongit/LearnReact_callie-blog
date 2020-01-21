import React, {Component, useContext, useEffect} from 'react';
import logo from '../../issets/img/logo-alt.png';
import TagsFooterWidget from '../Widget/TagsFooterWidget';
import CategoriesFooterWidget from '../Widget/CategoriesFooterWidget';
import {fetchingSettings, successSettings} from "../../action/SettingActionCreators";
import apiSent from "../../api/config";
import {DashBoardContext} from "../../Context";
import {useReducer} from 'reinspect';
import {initialStateSettings, SettingReducer} from "../../reducers/SettingReducer";
import Loader from "../Loader/Loader";
import {BASE_URL} from '../../api/config';
import {Link} from 'react-router-dom';

const Footer = () => {

    const [settings, dispatchSettings] = useReducer(SettingReducer, initialStateSettings, 'settings');
    ;

    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        dispatchSettings(fetchingSettings());
        apiSent.get('/settings').then(res => {
            dispatchSettings(successSettings(res.data.success));
        });

    }

    return (
        <footer id="footer">

            <div className="container">

                <div className="row">
                    <div className="col-md-4">
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <Link style={{height: 'auto'}} className="logo" to={'/'}>
                                    {(settings.response !== null) ?
                                        <img className={'img-fluid'} style={{maxHeight: '300px'}}
                                             src={BASE_URL + settings.response.footer_logo} alt=""/>
                                        : <Loader/>}
                                </Link>
                            </div>
                            <p>{settings.response !== null ? settings.response.footer_description : ''}</p>
                            {settings.response !== null && (
                            <ul className="contact-social">
                                {settings.response.facebook !== null && (
                                    <li><a href={settings.response.facebook} className="social-facebook"><i className="fa fa-facebook"></i></a>
                                    </li>
                                )}
                                {settings.response.twitter !== null && (
                                    <li><a href={settings.response.twitter} className="social-twitter"><i className="fa fa-twitter"></i></a>
                                    </li>
                                )}
                                {settings.response.google_plus !== null && (
                                    <li><a href={settings.response.google_plus} className="social-google-plus"><i className="fa fa-google-plus"></i></a>
                                    </li>
                                )}
                            </ul>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <CategoriesFooterWidget/>
                    </div>
                    <div className="col-md-4">
                        <TagsFooterWidget/>
                    </div>

                </div>

                <div className="footer-bottom row">

                    <div className="col-md-6 col-md-pull-6">
                        <div className="footer-copyright">

                            Copyright &copy;
                            <script>document.write(new Date().getFullYear());</script>
                            All rights reserved | This website made with <i className="fa fa-heart-o"
                                                                            aria-hidden="true"/> by <a
                            href="https://colorlib.com" target="_blank">CuongLe</a>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default (Footer);