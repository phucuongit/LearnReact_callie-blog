import React, {Component} from 'react';
import widget_3 from '../../issets/img/widget-3.jpg';
import ad_3 from '../../issets/img/ad-3.jpg';
import CategoryWidget from '../Widget/CategoryWidget';
import PopularPostsWidget from "../Widget/PopularPostsWidget";

class Sidebar extends Component {
    render() {
        return (
            <div>
                <div className="aside-widget text-center">
                    <a href="#" style={{"display": "inline-block", "margin": "auto"}}>
                        <img className="img-responsive" src={ad_3} alt=""/>
                    </a>
                </div>

                <div className="aside-widget">
                    <div className="section-title">
                        <h2 className="title">Social Media</h2>
                    </div>
                    <div className="social-widget">
                        <ul>
                            <li>
                                <a href="#" className="social-facebook">
                                    <i className="fa fa-facebook"/>
                                    <span>21.2K<br/>Followers</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="social-twitter">
                                    <i className="fa fa-twitter"/>
                                    <span>10.2K<br/>Followers</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="social-google-plus">
                                    <i className="fa fa-google-plus"></i>
                                    <span>5K<br/>Followers</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <CategoryWidget/>

                <PopularPostsWidget/>


            </div>
        );
    }
}

export default (Sidebar);