import React, {Component} from 'react';
import axios from 'axios';
import {NotFound} from '../NotFound/index';
class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
            post_title: '',
            post_content: '',
        }

    }
    componentDidMount() {
        const {slug } = this.props.match.params;
        const {history} = this.props;
        axios.get('http://127.0.0.1:8000/posts/' + slug)
            .then(res => {
                this.setState({
                    post_title: res.data.post.post_title,
                    post_content: res.data.post.post_content,
                })
            })
            .catch(function (error) {
                // handle error
                history.push('/post/not_found');
            })


    }

    render() {
        const { post_title, post_content} = this.state;

        return (
                        <div>

                            <div class="section-row">
                                <div class="post-share">
                                    <a href="#" class="social-facebook"><i class="fa fa-facebook"></i><span>Share</span></a>
                                    <a href="#" class="social-twitter"><i class="fa fa-twitter"></i><span>Tweet</span></a>
                                    <a href="#" class="social-pinterest"><i class="fa fa-pinterest"></i><span>Pin</span></a>
                                    <a href="#" ><i class="fa fa-envelope"></i><span>Email</span></a>
                                </div>
                            </div>

                            <div class="section-row">
                                <h3> {post_title}</h3>
                                {post_content}

                            </div>

                            <div class="section-row">
                                <div class="post-tags">
                                    <ul>
                                        <li>TAGS:</li>
                                        <li><a href="#">Social</a></li>
                                        <li><a href="#">Lifestyle</a></li>
                                        <li><a href="#">Fashion</a></li>
                                        <li><a href="#">Health</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="section-row">
                                <div class="post-nav">
                                    <div class="prev-post">
                                        <a class="post-img" href="blog-post.html"><img src="./img/widget-8.jpg" alt=""/></a>
                                        <h3 class="post-title"><a href="#">Sed ut perspiciatis, unde omnis iste natus error sit</a></h3>
                                        <span>Previous post</span>
                                    </div>

                                    <div class="next-post">
                                        <a class="post-img" href="blog-post.html"><img src="./img/widget-10.jpg" alt=""/></a>
                                        <h3 class="post-title"><a href="#">Postea senserit id eos, vivendo periculis ei qui</a></h3>
                                        <span>Next post</span>
                                    </div>
                                </div>
                            </div>

                            <div class="section-row">
                                <div class="section-title">
                                    <h3 class="title">About <a href="author.html">John Doe</a></h3>
                                </div>
                                <div class="author media">
                                    <div class="media-left">
                                        <a href="author.html">
                                            <img class="author-img media-object" src="./img/avatar-1.jpg" alt=""/>
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        <ul class="author-social">
                                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="section-title">
                                    <h3 class="title">Related Posts</h3>
                                </div>
                                <div class="row">

                                    <div class="col-md-4">
                                        <div class="post post-sm">
                                            <a class="post-img" href="blog-post.html"><img src="./img/post-4.jpg" alt=""/></a>
                                            <div class="post-body">
                                                <div class="post-category">
                                                    <a href="category.html">Health</a>
                                                </div>
                                                <h3 class="post-title title-sm"><a href="blog-post.html">Postea senserit id eos, vivendo periculis ei qui</a></h3>
                                                <ul class="post-meta">
                                                    <li><a href="author.html">John Doe</a></li>
                                                    <li>20 April 2018</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="post post-sm">
                                            <a class="post-img" href="blog-post.html"><img src="./img/post-6.jpg" alt=""/></a>
                                            <div class="post-body">
                                                <div class="post-category">
                                                    <a href="category.html">Fashion</a>
                                                    <a href="category.html">Lifestyle</a>
                                                </div>
                                                <h3 class="post-title title-sm"><a href="blog-post.html">Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.</a></h3>
                                                <ul class="post-meta">
                                                    <li><a href="author.html">John Doe</a></li>
                                                    <li>20 April 2018</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="post post-sm">
                                            <a class="post-img" href="blog-post.html"><img src="./img/post-7.jpg" alt=""/></a>
                                            <div class="post-body">
                                                <div class="post-category">
                                                    <a href="category.html">Health</a>
                                                    <a href="category.html">Lifestyle</a>
                                                </div>
                                                <h3 class="post-title title-sm"><a href="blog-post.html">Ne bonorum praesent cum, labitur persequeris definitionem quo cu?</a></h3>
                                                <ul class="post-meta">
                                                    <li><a href="author.html">John Doe</a></li>
                                                    <li>20 April 2018</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="section-row">
                                <div class="section-title">
                                    <h3 class="title">3 Comments</h3>
                                </div>
                                <div class="post-comments">

                                    <div class="media">
                                        <div class="media-left">
                                            <img class="media-object" src="./img/avatar-2.jpg" alt=""/>
                                        </div>
                                        <div class="media-body">
                                            <div class="media-heading">
                                                <h4>John Doe</h4>
                                                <span class="time">5 min ago</span>
                                            </div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                            <a href="#" class="reply">Reply</a>

                                            <div class="media media-author">
                                                <div class="media-left">
                                                    <img class="media-object" src="./img/avatar-1.jpg" alt=""/>
                                                </div>
                                                <div class="media-body">
                                                    <div class="media-heading">
                                                        <h4>John Doe</h4>
                                                        <span class="time">5 min ago</span>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                    <a href="#" class="reply">Reply</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="media">
                                        <div class="media-left">
                                            <img class="media-object" src="./img/avatar-3.jpg" alt=""/>
                                        </div>
                                        <div class="media-body">
                                            <div class="media-heading">
                                                <h4>John Doe</h4>
                                                <span class="time">5 min ago</span>
                                            </div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                            <a href="#" class="reply">Reply</a>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="section-row">
                                <div class="section-title">
                                    <h3 class="title">Leave a reply</h3>
                                </div>
                                <form class="post-reply">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea class="input" name="message" placeholder="Message"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <input class="input" type="text" name="name" placeholder="Name"/>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <input class="input" type="email" name="email" placeholder="Email"/>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <input class="input" type="text" name="website" placeholder="Website"/>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <button class="primary-button">Submit</button>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>


        );
    }
}

export default (Article);