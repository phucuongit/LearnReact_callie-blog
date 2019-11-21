import React, {Component} from 'react';
import post_9 from '../../issets/img/post-9.jpg'
class PostTemplate extends Component {
    render() {
        return (
            <div className="col-md-4">
                <div className="post post-sm">
                    <a className="post-img" href="blog-post.html"><img src={post_9} alt=""/></a>
                    <div className="post-body">
                        <div className="post-category">
                            <a href="category.html">Lifestyle</a>
                        </div>
                        <h3 className="post-title title-sm"><a href="blog-post.html">Mel ut impetus suscipit
                            tincidunt. Cum id ullum laboramus persequeris.</a></h3>
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

export default (PostTemplate);