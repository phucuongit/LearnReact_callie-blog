import React, {Component} from 'react';
import post_1 from '../../issets/img/post-1.jpg';
class RecentPost extends Component {
    render() {
        return (
            <div className="col-md-6">
                <div className="post">
                    <a className="post-img" href="blog-post.html"><img src={ post_1 } alt=""/></a>
                    <div className="post-body">
                        <div className="post-category">
                            <a href="category.html">Travel</a>
                        </div>
                        <h3 className="post-title"><a href="blog-post.html">Sed ut perspiciatis, unde omnis iste
                            natus error sit</a></h3>
                        <ul className="post-meta">
                            <li><a href="author.html">John Doe</a></li>
                            <li>20 April 2018</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default (RecentPost);