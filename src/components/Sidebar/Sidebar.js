import React, {Component} from 'react';
import widget_3 from '../../issets/img/widget-3.jpg';
import ad_3 from '../../issets/img/ad-3.jpg';
class Sidebar extends Component {
    render() {
        return (
            <div>
                <div className="aside-widget text-center">
                    <a href="#" style={{"display": "inline-block","margin": "auto"}}>
                        <img className="img-responsive" src={ad_3}alt=""/>
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

                <div className="aside-widget">
                    <div className="section-title">
                        <h2 className="title">Categories</h2>
                    </div>
                    <div className="category-widget">
                        <ul>
                            <li><a href="#">Lifestyle <span>451</span></a></li>
                            <li><a href="#">Fashion <span>230</span></a></li>
                            <li><a href="#">Technology <span>40</span></a></li>
                            <li><a href="#">Travel <span>38</span></a></li>
                            <li><a href="#">Health <span>24</span></a></li>
                        </ul>
                    </div>
                </div>

                <div className="aside-widget">
                    <div className="section-title">
                        <h2 className="title">Newsletter</h2>
                    </div>
                    <div className="newsletter-widget">
                        <form>
                            <p>Nec feugiat nisl pretium fusce id velit ut tortor pretium.</p>
                            <input className="input" name="newsletter" placeholder="Enter Your Email"/>
                                <button className="primary-button">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="aside-widget">
                    <div className="section-title">
                        <h2 className="title">Popular Posts</h2>
                    </div>

                    <div className="post post-widget">
                        <a className="post-img" href="blog-post.html"><img src={widget_3} alt=""></img></a>
                        <div className="post-body">
                            <div className="post-category">
                                <a href="category.html">Lifestyle</a>
                            </div>
                            <h3 className="post-title">
                                <a href="blog-post.html">Ne bonorum praesent cum, labitur
                                persequeris definitionem quo cu?</a>
                            </h3>
                        </div>

                    </div>

                    <div className="post post-widget">
                        <a className="post-img" href="blog-post.html"><img src="./img/widget-2.jpg" alt=""/></a>
                        <div className="post-body">
                            <div className="post-category">
                                <a href="category.html">Technology</a>
                                <a href="category.html">Lifestyle</a>
                            </div>
                            <h3 className="post-title"><a href="blog-post.html">Mel ut impetus suscipit tincidunt. Cum
                                id ullum laboramus persequeris.</a></h3>
                        </div>
                    </div>

                    <div className="post post-widget">
                        <a className="post-img" href="blog-post.html"><img src="./img/widget-4.jpg" alt=""/></a>
                        <div className="post-body">
                            <div className="post-category">
                                <a href="category.html">Health</a>
                            </div>
                            <h3 className="post-title"><a href="blog-post.html">Postea senserit id eos, vivendo
                                periculis ei qui</a></h3>
                        </div>
                    </div>

                    <div className="post post-widget">
                        <a className="post-img" href="blog-post.html"><img src="./img/widget-5.jpg" alt=""/></a>
                        <div className="post-body">
                            <div className="post-category">
                                <a href="category.html">Health</a>
                                <a href="category.html">Lifestyle</a>
                            </div>
                            <h3 className="post-title"><a href="blog-post.html">Sed ut perspiciatis, unde omnis iste
                                natus error sit</a></h3>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default (Sidebar);