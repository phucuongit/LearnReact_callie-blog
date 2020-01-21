import React from 'react';
import {Link} from "react-router-dom";
import image13 from './img/post-13.jpg';

const PostRow = ({post, className}) => {
    return (
        <div  className={`post ${ (className) ? className :'post-row'}`}>
            <Link to={post.slug} className="post-img">
                <img src={(post.image !== null) ? post.image.url : '/dist/img/loading1.gif'} alt=""/>
            </Link>
            <div className="post-body">
                {post.categories.length > 0 && (
                    <div className="post-category">
                        {post.categories.map((category, index) => {
                            if(index < 3){
                                return (<Link key={index} to={post.slug}>{category.category_name}</Link>);
                            }
                        })
                        }
                    </div>
                )
                }

                <h3 className="post-title"><Link to={post.slug}>{post.post_title}</Link></h3>
                <ul className="post-meta">
                    <li><a href="author.html">{post.NameAuthor}</a></li>
                    <li>{post.updated_at}</li>
                </ul>
                <p>{post.post_excerpt}</p>
            </div>
        </div>
    )
}
export default PostRow;