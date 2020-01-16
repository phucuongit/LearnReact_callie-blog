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

    const [settings, dispatchSettings] = useReducer(SettingReducer, initialStateSettings, 'settings');;

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
                                        <img className={'img-fluid'} style={{maxHeight: '300px'}} src={BASE_URL + settings.response.footer_logo} alt=""/>
                                        : <Loader/>}
                                </Link>
                            </div>
                            <p>{settings.response !== null ? settings.response.footer_description : ''}</p>
                            <ul className="contact-social">
                                <li><a href="#" className="social-facebook"><i className="fa fa-facebook"></i></a>
                                </li>
                                <li><a href="#" className="social-twitter"><i className="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="#" className="social-google-plus"><i className="fa fa-google-plus"></i></a>
                                </li>
                                <li><a href="#" className="social-instagram"><i className="fa fa-instagram"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <CategoriesFooterWidget/>
                    </div>
                    <div className="col-md-4">
                        <TagsFooterWidget/>
                    </div>
                    {/*<div className="col-md-3">*/}
                    {/*    <div className="footer-widget">*/}
                    {/*        <h3 className="footer-title">Newsletter</h3>*/}
                    {/*        <div className="newsletter-widget">*/}
                    {/*            <form>*/}
                    {/*                <p>Nec feugiat nisl pretium fusce id velit ut tortor pretium.</p>*/}
                    {/*                <input className="input" name="newsletter" placeholder="Enter Your Email"/>*/}
                    {/*                <button className="primary-button">Subscribe</button>*/}
                    {/*            </form>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div className="footer-bottom row">
                    <div className="col-md-6 col-md-push-6">
                        <ul className="footer-nav">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="contact.html">Contacts</a></li>
                            <li><a href="#">Advertise</a></li>
                            <li><a href="#">Privacy</a></li>
                        </ul>
                    </div>
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