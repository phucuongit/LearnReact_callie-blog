import React, {Component} from 'react';
import './header.css';
import logo from '../../issets/img/logo.png';
import post_10 from '../../issets/img/post-10.jpg';
import post_5 from '../../issets/img/post-5.jpg';
import post_12 from '../../issets/img/post-12.jpg';
import post_13 from '../../issets/img/post-13.jpg';
import { BrowserRouter as  Link,NavLink} from 'react-router-dom';
class Header extends Component {
    render() {
        return (

                <header id="header">

                <div id="nav">

                    <div id="nav-top">
                        <div className="container">

                            <ul className="nav-social">
                                <li><a href="#"><i className="fa fa-facebook"/></a></li>
                                <li><a href="#"><i className="fa fa-twitter"/>></a></li>
                                <li><a href="#"><i className="fa fa-google-plus"/>></a></li>
                                <li><a href="#"><i className="fa fa-instagram"/>></a></li>
                            </ul>

                            <div className="nav-logo">
                                <NavLink to="/" exact >

                                    <img src={logo} alt=""/>
                                </NavLink>

                            </div>

                            <div className="nav-btns">
                                <button className="aside-btn"><i className="fa fa-bars"/></button>
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
                                <li className="has-dropdown">

                                    <NavLink exact={true} activeStyle={{
                                        backgroundColor : 'white',
                                        color : 'red'
                                    }} to="/">Home</NavLink>

                                    <div className="dropdown">
                                        <div className="dropdown-body">
                                            <ul className="dropdown-list">
                                                <li><a href="category.html">Category page</a></li>
                                                <li><NavLink exact activeStyle={{
                                                    backgroundColor : 'white',
                                                    color : 'red'
                                                }} to="/post">Posts Page</NavLink></li>
                                                <li><a href="author.html">Author page</a></li>
                                                <li><a href="about.html">About Us</a></li>
                                                <li><NavLink activeStyle={{
                                                    backgroundColor : 'white',
                                                    color : 'red'
                                                }} exact to="/contact">Contact page</NavLink></li>
                                                <li><a href="blank.html">Regular</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="has-dropdown megamenu">
                                    <a href="#">Lifestyle</a>
                                    <div className="dropdown tab-dropdown">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <ul className="tab-nav">
                                                    <li className="active"><a data-toggle="tab" href="#tab1">Lifestyle</a></li>
                                                    <li><a data-toggle="tab" href="#tab2">Fashion</a></li>
                                                    <li><a data-toggle="tab" href="#tab1">Health</a></li>
                                                    <li><a data-toggle="tab" href="#tab2">Travel</a></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-10">
                                                <div className="dropdown-body tab-content">

                                                    <div id="tab1" className="tab-pane fade in active">
                                                        <div className="row">

                                                            <div className="col-md-4">
                                                                <div className="post post-sm">
                                                                    <a className="post-img" href="blog-post.html"><img src={post_10} alt=""/></a>
                                                                    <div className="post-body">
                                                                        <div className="post-category">
                                                                            <a href="category.html">Travel</a>
                                                                        </div>
                                                                        <h3 className="post-title title-sm"><a href="blog-post.html">Sed ut perspiciatis, unde omnis iste natus error sit</a></h3>
                                                                        <ul className="post-meta">
                                                                            <li><a href="author.html">John Doe</a></li>
                                                                            <li>20 April 2018</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="post post-sm">
                                                                    <a className="post-img" href="blog-post.html"><img src={post_13} alt=""/></a>
                                                                    <div className="post-body">
                                                                        <div className="post-category">
                                                                            <a href="category.html">Travel</a>
                                                                            <a href="category.html">Lifestyle</a>
                                                                        </div>
                                                                        <h3 className="post-title title-sm"><a href="blog-post.html">Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.</a></h3>
                                                                        <ul className="post-meta">
                                                                            <li><a href="author.html">John Doe</a></li>
                                                                            <li>20 April 2018</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="post post-sm">
                                                                    <a className="post-img" href="blog-post.html"><img src={post_12} alt=""/></a>
                                                                    <div className="post-body">
                                                                        <div className="post-category">
                                                                            <a href="category.html">Lifestyle</a>
                                                                        </div>
                                                                        <h3 className="post-title title-sm"><a href="blog-post.html">Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.</a></h3>
                                                                        <ul className="post-meta">
                                                                            <li><a href="author.html">John Doe</a></li>
                                                                            <li>20 April 2018</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div id="tab2" className="tab-pane fade in">
                                                        <div className="row">

                                                            <div className="col-md-4">
                                                                <div className="post post-sm">
                                                                    <a className="post-img" href="blog-post.html"><img src={post_5} alt=""/></a>
                                                                    <div className="post-body">
                                                                        <div className="post-category">
                                                                            <a href="category.html">Lifestyle</a>
                                                                        </div>
                                                                        <h3 className="post-title title-sm"><a href="blog-post.html">Postea senserit id eos, vivendo periculis ei qui</a></h3>
                                                                        <ul className="post-meta">
                                                                            <li><a href="author.html">John Doe</a></li>
                                                                            <li>20 April 2018</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="post post-sm">
                                                                    <a className="post-img" href="blog-post.html"><img src="./img/post-8.jpg" alt=""/></a>
                                                                    <div className="post-body">
                                                                        <div className="post-category">
                                                                            <a href="category.html">Fashion</a>
                                                                            <a href="category.html">Lifestyle</a>
                                                                        </div>
                                                                        <h3 className="post-title title-sm"><a href="blog-post.html">Sed ut perspiciatis, unde omnis iste natus error sit</a></h3>
                                                                        <ul className="post-meta">
                                                                            <li><a href="author.html">John Doe</a></li>
                                                                            <li>20 April 2018</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="post post-sm">
                                                                    <a className="post-img" href="blog-post.html"><img src="./img/post-9.jpg" alt=""/></a>
                                                                    <div className="post-body">
                                                                        <div className="post-category">
                                                                            <a href="category.html">Lifestyle</a>
                                                                        </div>
                                                                        <h3 className="post-title title-sm"><a href="blog-post.html">Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.</a></h3>
                                                                        <ul className="post-meta">
                                                                            <li><a href="author.html">John Doe</a></li>
                                                                            <li>20 April 2018</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="has-dropdown megamenu">
                                    <a href="#">Fashion</a>
                                    <div className="dropdown">
                                        <div className="dropdown-body">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <h4 className="dropdown-heading">Categories</h4>
                                                    <ul className="dropdown-list">
                                                        <li><a href="#">Lifestyle</a></li>
                                                        <li><a href="#">Fashion</a></li>
                                                        <li><a href="#">Technology</a></li>
                                                        <li><a href="#">Health</a></li>
                                                        <li><a href="#">Travel</a></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-3">
                                                    <h4 className="dropdown-heading">Lifestyle</h4>
                                                    <ul className="dropdown-list">
                                                        <li><a href="#">Lifestyle</a></li>
                                                        <li><a href="#">Fashion</a></li>
                                                        <li><a href="#">Health</a></li>
                                                    </ul>
                                                    <h4 className="dropdown-heading">Technology</h4>
                                                    <ul className="dropdown-list">
                                                        <li><a href="#">Lifestyle</a></li>
                                                        <li><a href="#">Travel</a></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-3">
                                                    <h4 className="dropdown-heading">Fashion</h4>
                                                    <ul className="dropdown-list">
                                                        <li><a href="#">Fashion</a></li>
                                                        <li><a href="#">Technology</a></li>
                                                    </ul>
                                                    <h4 className="dropdown-heading">Travel</h4>
                                                    <ul className="dropdown-list">
                                                        <li><a href="#">Lifestyle</a></li>
                                                        <li><a href="#">Healtth</a></li>
                                                        <li><a href="#">Fashion</a></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-3">
                                                    <h4 className="dropdown-heading">Health</h4>
                                                    <ul className="dropdown-list">
                                                        <li><a href="#">Technology</a></li>
                                                        <li><a href="#">Fashion</a></li>
                                                        <li><a href="#">Health</a></li>
                                                        <li><a href="#">Travel</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li><a href="#">Technology</a></li>
                                <li><a href="#">Health</a></li>
                                <li><a href="#">Travel</a></li>
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
}

export default Header;