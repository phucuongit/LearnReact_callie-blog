import React, {useContext, useMemo, useEffect} from 'react';
import useApiRequest from "../../../../hooks";
import Cookies from "js-cookie";
import {DashBoardContext} from "../../../../Context";
import {Link} from 'react-router-dom';
import axios from "axios";
import {getPostSuccess, getPostError, getPostFetching, removePost} from "../../../../action/postActionCreators";
import {FETCHING, SUCCESS} from "../../../../action/actionTypes";
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import {GET_POST_FETCHING, GET_POST_SUCCESS} from "../../../../action/postActionTypes";
import config, {BASE_URL} from '../../../../api/config';
import './styles.scss';
import Loader from "../../../../components/Loader/Loader";

const AllPost = () => {


    useEffect(() => {
        onLoad();

    }, []);
    let {useUserState} = useContext(DashBoardContext);
    const [state, dispatch] = useUserState;

    async function onLoad() {
        dispatch(getPostFetching());
        try {
            const response = await config({method: 'GET', url: '/posts'});
            dispatch(getPostSuccess(response));
        } catch (e) {
            dispatch(getPostError(e));
        }
    }

    const RemovePost = (id) => e => {
        axios.delete(`http://localhost:8000/api/posts/${id}`, {headers: {Authorization: Cookies.get('access_token')}})
            .then(res => {
                dispatch(removePost(id));
                alert("This post is removed");
            })
            .catch(e => {
                alert("You don't have this permission");
                throw e;
            });
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
                                    <th style={{"width": "115px"}}>Chuyên mục</th>
                                    <th>Thẻ</th>
                                    <th>Bình luận</th>
                                    <th>Thời gian</th>
                                    <th>Trạng thái</th>
                                    <th>Chỉnh sửa</th>
                                </tr>


                                </thead>
                                <tbody>
                                {
                                    state.status === GET_POST_FETCHING && (
                                        <Loader/>
                                    )
                                }
                                {
                                    state.status === GET_POST_SUCCESS && (
                                        state.response.map((post, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{post.id}</td>
                                                    {post.image !== null ?
                                                        (
                                                            <td>
                                                                <img src={BASE_URL + post.image.url}
                                                                     className={'img-fluid img--custom'}/>
                                                            </td>

                                                        ) :
                                                        <td>No image</td>
                                                    }
                                                    <td>
                                                        <Link to={`/admin/posts/${post.id}`}>
                                                            {post.post_title}
                                                        </Link>
                                                    </td>
                                                    <td>{post.NameAuthor}</td>
                                                    <td><span
                                                        className="tag tag-success">{post.categories.map((category, index) => {
                                                        return (<span key={index}>
                                                                <a style={{'color': 'red'}}
                                                                   href={'#'}>{category.category_name}</a>

                                                                {index !== post.categories.length - 1 ? ' , ' : ''}
                                                                </span>
                                                        )
                                                    })}

                                                    </span></td>
                                                    <td>chưa có dữ liệu</td>
                                                    <td>
                                                        <div>
                                                            {/*{ReactHtmlParser(post.post_content)}*/}
                                                            Chưa có dữ liệu
                                                        </div>

                                                    </td>
                                                    <td> {post.created_at}</td>

                                                    <td>
                                                        {post.display === 0 && ('Private')}
                                                        {post.display === 1 && ('Public')}
                                                    </td>
                                                    <td>
                                                        <Link className={'btn btn-warning'}
                                                              to={`/admin/posts/${post.id}`}>
                                                            Sửa
                                                        </Link>
                                                        <a className={'btn btn-danger'}
                                                           onClick={RemovePost(post.id)}>Xóa</a>
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