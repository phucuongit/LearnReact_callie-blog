import React, {Component} from 'react';
import post_9 from '../../issets/img/post-9.jpg'
import {Link} from "react-router-dom";
class PostTemplate extends Component {
    constructor(props){
        super(props);
        const { name, slug } = this.props;

        this.state = {
            name: name,
            slug: slug,
        }

    }
    render() {
        const {name,slug} = this.state;
        return (
            <div className="col-md-4">
                <div className="post post-sm">
                    <a className="post-img" href="blog-post.html"><img src={post_9} alt=""/></a>
                    <div className="post-body">
                        <div className="post-category">
                            <a href="category.html">Lifestyle</a>
                        </div>
                        <h3 className="post-title title-sm"><Link to={`${slug}`}>{name}</Link></h3>
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