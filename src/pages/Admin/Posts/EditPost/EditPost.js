import React  from 'react';
import {Editor} from "@tinymce/tinymce-react";
import {useHistory} from "react-router-dom";
import { useParams} from "react-router";
import {useContext, useEffect} from "react";
import {DashBoardContext} from "../../../../Context";
import {useState} from "reinspect";
import axios from "axios";
import Cookies from "js-cookie";
import {getPostByIDFetching, getPostByIDSuccess, getPostByIDError} from "../../../../action/postActionCreators";

const EditPost = () =>  {

    let {id} = useParams();
    let history = useHistory();
    const [state, dispatch] = useContext(DashBoardContext);
    let response = null;
    const [post, setPost] = useState({
        status: 0, // 0 - bản nháp, 1 đã lên lịch , 2 - đã đăng
        display: 0, // 0 - công khai, 1 - được bảo vệ mật khẩu, 2 - riêng tư
        time_public: 0, // 0 - đăng imediately, time - ngày public
        post_title: '',
        post_content: '',
        image_thumbnail: '',
        categories: [],
    });
    const [ isEditing, setEdit ] = useState({editStatus: post.status, editDisplay: post.display, editTimePublic: post.time_public });
    let [image , setImage] = useState({uploading: false, images:null});
    useEffect( () => {
        // onLoad();

    }, [post, isEditing]);
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
        setPost({
            ...post,
            post_content: e.target.getContent(),
        } );
    }
    const handleChange = (e) => {
        setPost({
            ...post,
            post_title: e.target.value,
        })
    }
    const changeEdit = () => {
        setEdit({
            ...isEditing,
            editStatus: !isEditing.editStatus,
        });
    }
    const changeEditDisplay = () => {
        setEdit({
            ...isEditing,
            editDisplay: !isEditing.editDisplay,
        });
    }
    const changeEditPublic = () => {
        setEdit({
            ...isEditing,
            editTimePublic: !isEditing.editTimePublic,
        });
    }

    const changeEditStatus = (e) => {
        setPost({
            ...post,
            status: parseInt(e.target.value),
        })
    }
    const EditStateDisplay =  (e) => {
        setPost({
            ...post,
            display: parseInt(e.target.value),
        })
    }
    const publicPost = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:8000/api/posts/add',
            headers: {
                Authorization: Cookies.get('access_token'),
            },
            data: post
        }).then(res => {
            history.push('/admin/all-posts');
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Thêm bài viết</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">
                                    <a href="#" onClick={() => history.goBack()}>All Posts</a>
                                </li>
                                <li className="breadcrumb-item active">Add Post</li>
                            </ol>
                        </div>
                    </div>
                </div>

            </section>

            <div className="row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label>Tiêu đề</label>
                        <input type="text" onChange={(e) => handleChange(e)} defaultValue={''} className="form-control" placeholder="Enter the title's post..."/>
                    </div>
                    <Editor
                        apiKey='st1rdmijtzac8vx3cyhjdc2uemv974mtvt8igvv1dbglox18'
                        initialValue={''}
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
                                Trạng thái: <span id="post-status-display">{ (isEditing.editStatus) ?
                                (
                                    <>
                                        <select name={'status'} onClick={(e) => changeEditStatus(e)} style={{marginRight: "20px"}}>
                                            <option value={0}>Bản nháp</option>
                                            <option value={1}>Chờ duyệt</option>
                                        </select>
                                        <a href={'#'} onClick={changeEdit}>Ok</a>
                                    </>
                                )
                                : (
                                    <>
                                        <span style={{fontWeight: 600}}>{ post.status === 0 ? 'Bản nháp' : 'Chờ duyệt' }</span>
                                        <a href="#" onClick={changeEdit}>Chỉnh sửa status</a>
                                    </>
                                )
                            } </span>

                            </div>
                            <div className="misc-pub-post-status">
                                Hiển thị: <span id="post-status-display">{ (isEditing.editDisplay) ?
                                (
                                    <>
                                        <select name={'display'} onClick={(e) => EditStateDisplay(e)} style={{marginRight: "20px"}}>
                                            <option value={0}>Công khai</option>
                                            <option value={1}>Riêng tư</option>
                                        </select>
                                        <a href={'#'} onClick={changeEditDisplay}>Ok</a>
                                    </>
                                ) :
                                (
                                    <>
                                        <span style={{fontWeight: 600}}>{ post.display === 0 ?  'Công khai' : 'Riêng tư' }</span>
                                        <a href="#" onClick={changeEditDisplay}>Chỉnh sửa hiển thị</a>
                                    </>

                                )}
                                    </span>

                            </div>
                            <div className="misc-pub-post-status">
                                Đăng
                                {(isEditing.editTimePublic) ? (
                                    <>
                                        <div className="timestamp-wrap">
                                            <label><span className="screen-reader-text">Ngày</span>
                                                <input type="text" name="date" defaultValue={new Date().getDay()} size="2" maxLength="2"
                                                       autoComplete="off"/>
                                            </label>
                                            <label><span className="screen-reader-text">Tháng</span>
                                                <select id="mm" name="mm" className={'form-control'}>
                                                    <option value="01" data-text="Th1">01-Th1</option>
                                                    <option value="02" data-text="Th2">02-Th2</option>
                                                    <option value="03" data-text="Th3">03-Th3</option>
                                                    <option value="04" data-text="Th4">04-Th4</option>
                                                    <option value="05" data-text="Th5">05-Th5</option>
                                                    <option value="06" data-text="Th6">06-Th6</option>
                                                    <option value="07" data-text="Th7">07-Th7</option>
                                                    <option value="08" data-text="Th8">08-Th8</option>
                                                    <option value="09" data-text="Th9">09-Th9</option>
                                                    <option value="10" data-text="Th10">10-Th10</option>
                                                    <option value="11" data-text="Th11">11-Th11</option>
                                                    <option value="12" data-text="Th12" selected="selected">12-Th12</option>
                                                </select>
                                            </label>
                                            <label><span className="screen-reader-text">Năm</span>
                                                <input type="number" name="year" defaultValue={new Date().getFullYear()} size="4" maxLength="4"
                                                       autoComplete="off"/>
                                            </label>
                                            <label><span className="screen-reader-text">Giờ</span>
                                                <input type="number" name="hh" defaultValue={new Date().getHours()} size="2" maxLength="2"
                                                       autoComplete="off"/>
                                            </label>
                                            <label><span className="screen-reader-text">Phút</span>
                                                <input type="text" id="mn" name="mn" defaultValue={new Date().getMinutes()} size="2" maxLength="2"
                                                       autoComplete="off"/>
                                            </label>
                                        </div>
                                        <a href="#" className={'timestamp-wrap__ok'} onClick={changeEditPublic}>OK</a>
                                    </>
                                ) : (
                                    <>
                                        <span style={{fontWeight: 600}}>{ post.time_public === 0 ? ' Ngay lập tức' : ' Ngày: ... Tháng: ... Năm: ...' }</span>
                                        <a href="#" onClick={changeEditPublic}>Chỉnh sửa đăng</a>
                                    </>
                                )
                                }

                            </div>
                            <button className={'mt-2 btn btn-success'} onClick={publicPost}>Đăng</button>
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


                    </div>

                </div>

            </div>
        </div>
    );
}
export default EditPost;