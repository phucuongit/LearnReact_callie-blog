import React, {Component, useContext, useEffect} from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import {useLocation} from 'react-router';
import {useReducer, useState} from 'reinspect';
import AddComments from "../../components/Comments/AddComments";
import sentApi from '../../api/config';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import CommentReducer, {initialState} from "../../reducers/CommentReducer";
import {comment_fetching, comment_success, comment_error} from '../../action/CommentActionCreators';
import ShowComments from '../../components/Comments/ShowComment';
import {COMMENT_FETCHING, COMMENT_SUCCESS} from "../../action/CommentActionTypes";
import {CommentContext} from '../../Context';
import Cookie from 'js-cookie';
import queryString from 'querystring';

const Article = () => {
    let history = useHistory();
    let location = useLocation();
    const search = (location.search);
    // console.log(search);
    let {slug} = useParams();
    let [post, setPost] = useState(null);
    let commentReducer = useReducer(CommentReducer,initialState, 'commentPost');
    let comments = commentReducer[0];
    let dispatch = commentReducer[1];
    useEffect(() => {
        onLoad();

    },[]);
    function onLoad(){

        sentApi.get(`/posts/${slug}`, {
            // withCredentials: true,
        }).then(res => {
            console.log( res);
            Cookie.set('laravel_session', res.headers['Set-Cookie']);
            setPost(res.data.success);
        }).catch(e => {
            console.log(e);
        });
        dispatch(comment_fetching());
        sentApi.get(`/posts/${slug}/comments`).then(res => {
            dispatch(comment_success(res.data.success));
        }).catch(e => {
            history.push('/404');
            dispatch(comment_error(e));
        });
        if(search){
            sentApi.get(`/notifications${search}`).then(res => {
                
            }).catch(e => console.log(e));
        }
    }
    return (
        <div>
            <CommentContext.Provider value={commentReducer}>
                <div className="section-row">
                    <div className="post-share">
                        <a href="#" className="social-facebook"><i className="fa fa-facebook"></i><span>Share</span></a>
                        <a href="#" className="social-twitter"><i className="fa fa-twitter"></i><span>Tweet</span></a>
                        <a href="#" className="social-pinterest"><i className="fa fa-pinterest"></i><span>Pin</span></a>
                        <a href="#"><i className="fa fa-envelope"></i><span>Email</span></a>
                    </div>
                </div>
                {post !== null && (
                    <div>
                        <div className="section-row">
                            <h3>{post.post_title} <i className="far fa-eye"/> <span style={{'color': 'red', 'font-weight': 700}}>{post.view_count}</span></h3>

                            {ReactHtmlParser(post.post_content)}
                        </div>
                        <div className="section-row">
                            <div className="section-title">
                                <h3 className="title">Author: <a href="author.html">{post.NameAuthor}</a></h3>
                            </div>
                        </div>
                        <div className="section-row">
                            <div className="post-tags">
                                <ul>
                                    <li>TAGS:</li>
                                    <li><a href="#">Social</a></li>
                                    <li><a href="#">Lifestyle</a></li>
                                    <li><a href="#">Fashion</a></li>
                                    <li><a href="#">Health</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="section-row">
                            <div className="post-nav">
                                <div className="prev-post">
                                    <a className="post-img" href="blog-post.html"><img src={(post.image !== null) ? post.image.url : '/dist/img/loading1.gif'} alt=""/></a>
                                    <h3 className="post-title"><a href="#">Sed ut perspiciatis, unde omnis iste natus error
                                        sit</a></h3>
                                    <span>Previous post</span>
                                </div>

                                <div className="next-post">
                                    <a className="post-img" href="blog-post.html"><img src="./img/widget-10.jpg" alt=""/></a>
                                    <h3 className="post-title"><a href="#">Postea senserit id eos, vivendo periculis ei qui</a>
                                    </h3>
                                    <span>Next post</span>
                                </div>
                            </div>
                        </div>



                        <div>
                            <div className="section-title">
                                <h3 className="title">Related Posts</h3>
                            </div>
                            <div className="row">

                                <div className="col-md-4">
                                    <div className="post post-sm">
                                        <a className="post-img" href="blog-post.html"><img src="./img/post-4.jpg" alt=""/></a>
                                        <div className="post-body">
                                            <div className="post-category">
                                                <a href="category.html">Health</a>
                                            </div>
                                            <h3 className="post-title title-sm"><a href="blog-post.html">Postea senserit id eos,
                                                vivendo
                                                periculis ei qui</a></h3>
                                            <ul className="post-meta">
                                                <li><a href="author.html">John Doe</a></li>
                                                <li>20 April 2018</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="post post-sm">
                                        <a className="post-img" href="blog-post.html"><img src="./img/post-6.jpg" alt=""/></a>
                                        <div className="post-body">
                                            <div className="post-category">
                                                <a href="category.html">Fashion</a>
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

                                <div className="col-md-4">
                                    <div className="post post-sm">
                                        <a className="post-img" href="blog-post.html"><img src="./img/post-7.jpg" alt=""/></a>
                                        <div className="post-body">
                                            <div className="post-category">
                                                <a href="category.html">Health</a>
                                                <a href="category.html">Lifestyle</a>
                                            </div>
                                            <h3 className="post-title title-sm"><a href="blog-post.html">Ne bonorum praesent
                                                cum,
                                                labitur persequeris definitionem quo cu?</a></h3>
                                            <ul className="post-meta">
                                                <li><a href="author.html">John Doe</a></li>
                                                <li>20 April 2018</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="section-row">
                            {
                                comments.status === COMMENT_SUCCESS && (
                                    comments.comments.length > 0 && (
                                            <div className="section-title">
                                                <h3 className="title">{comments.comments.length } {comments.comments.length > 1 ? 'Comments' : 'Comment'} </h3>
                                            </div>
                                        )

                                )
                            }
                            <div className="post-comments">
                                {comments.status === COMMENT_FETCHING && (
                                    <div>Loading...</div>
                                )}
                                {comments.status === COMMENT_SUCCESS && (
                                    comments.comments.map((comment, index) => {
                                        return <ShowComments commentProps={comment} key={index}  post_id={post.id}/>
                                    })

                                )}



                            </div>
                        </div>
                    </div>
                )}

                { post !== null && (<AddComments post_id={post.id}/>)}
            </CommentContext.Provider>

        </div>
    )
}

export default (Article);