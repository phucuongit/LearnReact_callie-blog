import React, {useContext, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {DashBoardContext} from "../../../../Context";
import {useState} from "reinspect";
import {getPostByIDError, getPostByIDFetching, getPostByIDSuccess} from "../../../../action/postActionCreators";
import axios from "axios";
import Cookies from "js-cookie";
import {Editor} from "@tinymce/tinymce-react";
import './styles.scss';
import toast from 'toastr';
import 'toastr/toastr.scss';
import {UserLoginContext} from "../../../../Context";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const AddPost = () => {
    let history = useHistory();

    let {useUserState} = useContext(DashBoardContext);

    const [state, dispatch] = useUserState;
    const {UserLogin, setUserLogin} = useContext(UserLoginContext);
    const [post, setPost] = useState({
        status: 0, // 0 - bản nháp, 1 đã lên lịch , 2 - đã đăng
        display: 0, // 0 - công khai, 1 - được bảo vệ mật khẩu, 2 - riêng tư
        time_public: 0, // 0 - đăng imediately, time - ngày public
        post_title: '',
        post_content: '',
        user_id: (UserLogin!== null) ? UserLogin.id : null,
        image_thumbnail: null,
        categories: [],
    });
    const [ isEditing, setEdit ] = useState({editStatus: post.status, editDisplay: post.display, editTimePublic: post.time_public });
    let [image , setImage] = useState({uploading: false, images:null});
    let [Category , setCategory] = useState(null);

    useEffect(() => {
        onLoad();
    }, []);
    const onLoad = async () => {
        axios({
            url: 'http://localhost:8000/api/categories',
            method: 'GET',
            headers: {
                Authorization: Cookies.get('access_token'),
            }
        }).then(res => {
            setCategory(res.data.success);
        }).catch(e => console.log(e));

    }
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
    const EditStateDisplay = (e) => {
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
            data: post,

        }).then(res => {
            history.push('/admin/all-posts');
            console.log(post);
        }).catch(e => {
            console.log(e);
        });

    }
    const updateImage = (e) => {
        const files = Array.from(e.target.files);
        if(files.length > 1){
            const msg = 'Only one image can be uploaded at a time';
            e.target.value = e.target.defaultValue;
            return toast.error(msg, {closeButton:true, timeOut: 5000})
        }
        if(files[0].size > 600000){ // 600 kb
            const msg = 'this image is too large';
            e.target.value = e.target.defaultValue;
            return toast.error(msg, {closeButton:true, timeOut: 5000})
        }
        setImage({
            ...image,
            uploading: true,
            images: URL.createObjectURL(e.target.files[0])
        });

        //upload image

        const formData = new FormData();
        files.forEach((image_file) => {
            formData.append('file', image_file);
        });
        axios.post('http://localhost:8000/api/images', formData, {
                headers: {
                    Authorization: Cookies.get('access_token'),
                    'Content-Type': 'multipart/form-data',
                }
            }
        ).then(res => {
            setPost({
                ...post,
                image_thumbnail: res.data.success,
            })
        }).catch(e => console.log(e));

    }
    const removeImage = (e) => {
        setImage({
            ...image,
            uploading: false,
            images: null,
        });
        axios.delete(`http://localhost:8000/api/images/${ post.image_thumbnail}`, {
                headers: {
                    Authorization: Cookies.get('access_token'),
                }
            }
        ).then(res => {
            console.log(res.data.success);
        })
    }
    const handleSelect = (e) => {
        let id = parseInt(e.target.value);
        if(e.target.checked){
            setPost({
                ...post,
                categories: [...post.categories, id]
            })
        }else{
            setPost({
                ...post,
                categories: post.categories.filter((element,i) => {
                    return element !== id;
                }),
            });
        }

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
                        <input type="text" onChange={(e) => handleChange(e)} className="form-control" placeholder="Enter the title's post..."/>
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
                                Hiển thị: <span id="post-status-display">{ (isEditing.editDisplay) ?
                                (
                                    <>
                                        <select name={'display'} onClick={(e) => EditStateDisplay(e)} style={{marginRight: "20px"}}>
                                            <option value={1}>Công khai</option>
                                            <option value={0}>Riêng tư</option>
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

                        { !image.uploading ? (
                            <div className="card-body" style={{"display": "block"}}>
                                <form className="md-form">
                                    <div className="file-field">
                                        <a className="btn-floating purple-gradient mt-0 float-left">
                                            <i className="fas fa-cloud-upload-alt" aria-hidden="true"/>
                                            <input type="file" lang={'en'} accept={'image/x-png, image/gif, image/jpeg'} onChange={(e) => updateImage(e)} name={'thumbnail__file'}/>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="card-body" style={{"display": "block"}}>
                                <div
                                    onClick={(e) => removeImage(e)}
                                    className='btn--delete'
                                >
                                    <i className="fas fa-minus-circle"></i>
                                </div>
                                <img src={image.images} className={'img-thumbnail'} />
                            </div>
                        )
                        }

                    </div>
                    <div className="card card-danger">
                        <div className="card-header">
                            <h3 className="card-title">Tất cả danh mục</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus"/>
                                </button>
                            </div>
                        </div>


                        <div className="card-body" style={{"display": "block"}}>
                            <form className="md-form">
                                <div className="file-field">
                                    <ul className="list-group list-group-flush">
                                        { Category !== null && (
                                            Category.map((element, index) => {
                                                return (


                                                    <li className="list-group-control" key={index}>
                                                        <label className="custom-control custom-checkbox">
                                                            <input type="checkbox"  className="form-check-input" value={element.id} onChange={handleSelect}/>
                                                            <span className="custom-control-indicator"></span>
                                                            <span className="custom-control-description">{element.category_name}</span>
                                                        </label>
                                                    </li>


                                                )
                                            })

                                        )
                                        }</ul>


                                </div>
                            </form>
                        </div>




                    </div>

                </div>

            </div>
        </div>
    );
}
export default AddPost;