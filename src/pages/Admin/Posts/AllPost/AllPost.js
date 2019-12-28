import React,  {useContext,useMemo, useEffect} from 'react';
import useApiRequest from "../../../../hooks";
import Cookies from "js-cookie";
import {DashBoardContext} from "../../../../Context";
import {Link} from 'react-router-dom';
import axios from "axios";
import {getPostSuccess, getPostError, getPostFetching, removePost} from "../../../../action/postActionCreators";
import {FETCHING, SUCCESS} from "../../../../action/actionTypes";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {GET_POST_FETCHING, GET_POST_SUCCESS} from "../../../../action/postActionTypes";

const AllPost = () => {
    const [ state, dispatch ] = useContext(DashBoardContext);
    useEffect(() => {
        onLoad();

    }, []);

    async function onLoad(){
        dispatch(getPostFetching());
        try {
            const response = await axios({ method: 'GET', url: 'http://localhost:8000/api/posts', headers: {Authorization: Cookies.get('access_token')} });
            dispatch(getPostSuccess(response));
        } catch (e) {
            dispatch(getPostError(e));
        }
    }

    const RemovePost = (id) => e => {

        dispatch(removePost(id));
        axios.delete(`http://localhost:8000/api/posts/${id}`, {headers: {Authorization: Cookies.get('access_token')}})
            .then(res => alert("This post is removed"))
            .catch(e => {throw e});
    }
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6"><h1 className="m-0 text-dark">All Posts</h1></div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Dashboard v2</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Link to={'/admin/add-posts'}>
                        <button className={'btn btn-success'}>
                            Add Post
                        </button>
                    </Link>
                </div>
            </div>
            <div className="row">

                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Fixed Header Table</h3>
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{"width": "150px"}}>
                                    <input type="text" name="table_search" className="form-control float-right"
                                           placeholder="Search"/>

                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-default"><i
                                            className="fas fa-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-body table-responsive p-0" style={{"height": "100vh"}}>
                            <table className="table table-head-fixed">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Thumbnail</th>
                                    <th>Tiêu đề</th>
                                    <th>Tác giả</th>
                                    <th>Chuyên mục</th>
                                    <th>Thẻ</th>
                                    <th>Bình luận</th>
                                    <th>Thời gian</th>
                                    <th>Chỉnh sửa</th>
                                </tr>


                                </thead>
                                <tbody>
                                {
                                    state.status === GET_POST_FETCHING && (
                                        <tr>
                                            <td>Fetching...</td>
                                            <td>Fetching...</td>
                                            <td>Fetching...</td>
                                            <td><span className="tag tag-success">Fetching...</span></td>
                                            <td>Fetching...</td>
                                        </tr>
                                    )
                                }
                                {
                                    state.status === GET_POST_SUCCESS && (
                                        state.response.map((post,index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{post.id}</td>
                                                    {post.photo_id !== null ?
                                                        (
                                                            <img src={'http://localhost:8000/images/' + post.photo.photo_name} className={'img-fluid'}/>
                                                        ) :
                                                        <td>No image</td>
                                                    }
                                                    <td>
                                                        <Link to={`/admin/posts/${post.id}`}>
                                                            {post.post_title}
                                                        </Link>

                                                    </td>
                                                    <td>{post.updated_at}</td>
                                                    <td><span className="tag tag-success">{post.slug}</span></td>
                                                    <td>{post.post_content}</td>
                                                    <td>
                                                        <div >
                                                            {ReactHtmlParser(post.post_content)}
                                                        </div>

                                                    </td>
                                                    <td>
                                                        {post.created_at}</td>
                                                    <td>
                                                        <Link className={'btn btn-warning'} to={`/admin/posts/${post.id}`}>
                                                            Sửa
                                                        </Link>
                                                        <a className={'btn btn-danger'} onClick={RemovePost(post.id)}>Xóa</a>
                                                    </td>
                                                </tr>
                                            )
                                        }))
                                }


                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default AllPost;