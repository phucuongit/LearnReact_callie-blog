import React, {Component} from 'react';
import hot_post_1 from '../../issets/img/hot-post-1.jpg';
import hot_post_2 from '../../issets/img/hot-post-2.jpg';
import hot_post_3 from '../../issets/img/hot-post-3.jpg';
class HotPost extends Component {
    render() {
        return (

            <div className="section">

                <div className="container">

                    <div id="hot-post" className="row hot-post">
                        <div className="col-md-8 hot-post-left">

                            <div className="post post-thumb">
                                <a className="post-img" href="blog-post.html"><img src={hot_post_1} alt=""/></a>
                                <div className="post-body">
                                    <div className="post-category">
                                        <a href="category.html">Lifestyle</a>
                                    </div>
                                    <h3 className="post-title title-lg"><a href="blog-post.html">Postea senserit id eos, vivendo periculis ei qui</a></h3>
                                    <ul className="post-meta">
                                        <li><a href="author.html">John Doe</a></li>
                                        <li>20 April 2018</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4 hot-post-right">

                            <div className="post post-thumb">
                                <a className="post-img" href="blog-post.html"><img src={hot_post_2} alt=""/></a>
                                <div className="post-body">
                                    <div className="post-category">
                                        <a href="category.html">Lifestyle</a>
                                    </div>
                                    <h3 className="post-title"><a href="blog-post.html">Sed ut perspiciatis, unde omnis iste natus error sit</a></h3>
                                    <ul className="post-meta">
                                        <li><a href="author.html">John Doe</a></li>
                                        <li>20 April 2018</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="post post-thumb">
                                <a className="post-img" href="blog-post.html"><img src={hot_post_3} alt=""/></a>
                                <div className="post-body">
                                    <div className="post-category">
                                        <a href="category.html">Fashion</a>
                                        <a href="category.html">Lifestyle</a>
                                    </div>
                                    <h3 className="post-title"><a href="blog-post.html">Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.</a></h3>
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

        );
    }
}

export default (HotPost);