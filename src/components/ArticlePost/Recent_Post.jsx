import React, {Component} from 'react';
import post_1 from '../../issets/img/post-1.jpg';
import {Link} from "react-router-dom";
const RecentPost = ({rentPost}) => {

        return (
            <div className="col-md-6">
                <div className="post">
                    <Link className="post-img" to={rentPost.slug}><img src={ post_1 } alt=""/></Link>
                    <div className="post-body">
                        <div className="post-category">
                            {rentPost.CategoriesPost.map((category, index) => {
                                if(index < 2){
                                    return (<Link key={index} to={category.category_slug}>{category.category_name}</Link>)
                                }
                            })}
                        </div>
                        <h3 className="post-title"><a href="blog-post.html">{rentPost.post_title}</a></h3>
                        <ul className="post-meta">
                            <li><a href="author.html">{rentPost.user.name}</a></li>
                            <li>{rentPost.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
}

export default (RecentPost);