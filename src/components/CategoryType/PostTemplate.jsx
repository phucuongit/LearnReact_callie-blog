import React, {Component} from 'react';
import post_9 from '../../issets/img/post-9.jpg'
import {Link} from "react-router-dom";

const PostTemplate = ({postsProps}) => {
    console.log(postsProps);
    return (
        <div className="col-md-4">
            <div className="post post-sm">
                <Link className="post-img" to={postsProps.slug}>
                    <img src={post_9} alt=""/>
                </Link>
                <div className="post-body">
                    <div className="post-category">
                        {postsProps.CategoriesPost.map((category, index) => {
                            return (<Link key={index} to={category.category_slug}>{category.category_name}</Link>)
                        })}

                    </div>
                    <h3 className="post-title title-sm"><Link to={postsProps.slug}>{postsProps.post_title}</Link></h3>
                    <ul className="post-meta">
                        <li><a href="author.html">{postsProps.user.name}</a></li>
                        <li>{postsProps.created_at}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default (PostTemplate);