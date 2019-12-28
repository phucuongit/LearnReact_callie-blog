import React, {useEffect, useContext} from 'react';
import {useParams} from 'react-router';
import {getPostByIDFetching, getPostByIDSuccess, getPostByIDError} from "../../../../action/postActionCreators";
import axios from "axios";
import {useHistory, Link} from 'react-router-dom';
import Cookies from "js-cookie";
import {DashBoardContext} from "../../../../Context";
import { Editor } from '@tinymce/tinymce-react';
import {useState} from 'reinspect';


const PostDetail = () => {
    let {id} = useParams();
    let history = useHistory();
    const [state, dispatch] = useContext(DashBoardContext);

    const [post, setPost] = useState(null);

    let response = null;
        useEffect( () => {
            onLoad();
        }, []);
        async function onLoad(){
            dispatch(getPostByIDFetching());
            try {
                response = await axios({ method: 'GET', url: `http://localhost:8000/api/posts/${id}`, headers: {Authorization: Cookies.get('access_token')} });
                dispatch(getPostByIDSuccess(response));
                setPost(state);
            } catch (e) {
                dispatch(getPostByIDError(e));
            }
        };
        const handleEditorChange = (e) => {
            console.log('Content was updated:', e.target.getContent());
            console.log(state);
        }
        const handleChange = (e) => {
            console.log(post);
        }
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Chỉnh sửa bài viết</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">
                                        <a href="#" onClick={() => history.goBack()}>All Posts</a>
                                       </li>
                                    <li className="breadcrumb-item active">Post </li>
                                </ol>
                            </div>
                        </div>
                    </div>

                </section>
                <div className="row">

                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input type="text" defaultValue={(state.response !== null) ? state.response[0].post_title : 'Loading...' } onChange={(e) => handleChange(e)} className="form-control" placeholder="Enter the title's post..."/>
                        </div>
                        <Editor
                            apiKey='st1rdmijtzac8vx3cyhjdc2uemv974mtvt8igvv1dbglox18'
                            initialValue={(state.response !== null) ? state.response[0].post_content : 'Loading...' }
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                            onChange={handleEditorChange}
                        />
                    </div>
                    <div className="col-md-4">

                            <div className="card card-success">
                                <div className="card-header">
                                    <h3 className="card-title">Đăng</h3>

                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus"/>
                                        </button>
                                    </div>

                                </div>

                                <div className="card-body" style={{"display": "block"}}>
                                    <div className="misc-pub-post-status">
                                        Trạng thái: <span id="post-status-display">Đã lên lịch</span>
                                    </div>
                                    <div className="misc-pub-post-status">
                                        Hiển thị: <span id="post-status-display">Công khai</span>
                                    </div>
                                    <div className="misc-pub-post-status">
                                        Đã lên lịch vào: <span id="post-status-display">Th1 1, 2020 @ 09:51</span>
                                    </div>
                                </div>

                            </div>
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Ảnh đại diện</h3>

                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus"/>
                                        </button>
                                    </div>

                                </div>

                                <div className="card-body" style={{"display": "block"}}>
                                    <form className="md-form">
                                        <div className="file-field">
                                            <a className="btn-floating purple-gradient mt-0 float-left">
                                                <i className="fas fa-cloud-upload-alt" aria-hidden="true"></i>
                                                <input type="file" lang={'en'} id={'thumbnail__file'}/>
                                            </a>

                                        </div>
                                    </form>
                                </div>

                            </div>

                    </div>

                </div>
            </div>
        );
}
export default PostDetail;