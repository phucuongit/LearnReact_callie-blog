import React, {useContext, useEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {DashBoardContext} from "../../../../Context";
import {useState} from "reinspect";
import {getPostByIDError, getPostByIDFetching, getPostByIDSuccess} from "../../../../action/postActionCreators";
import axios from "axios";
import Cookies from "js-cookie";
import {Editor} from "@tinymce/tinymce-react";
import apiSentData from '../../../../api/config';
import toast from 'toastr';
import 'toastr/toastr.scss';
import {UserLoginContext} from "../../../../Context";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
    let history = useHistory();
    const [state, dispatch] = useContext(DashBoardContext);
    const {UserLogin, setUserLogin} = useContext(UserLoginContext);
    const [post, setPost] = useState(null);
    const [ isEditing, setEdit ] = useState({editStatus: '', editDisplay: '', editTimePublic: '' });
    let [image , setImage] = useState({uploading: false, images:null});
    let [Category , setCategory] = useState(null);
    let {id} = useParams();
    useEffect(() => {
        onLoad();
    }, []);
    const onLoad = async () => {
        apiSentData({
            url: '/categories',
            method: 'GET',
        }).then(res => {
            setCategory(res.data.success);
        }).catch(e => console.log(e));
        apiSentData({
            url: `/posts/${id}`,
            method: 'GET',
        }).then(res => {
            setPost(res.data.success);

            // setImage({
            //     ...image,
            //     uploading: false,
            //     images: res.data.success.image_thumbnail,
            // })
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
    const SaveEditPost = () => {
        apiSentData({
            method: 'PUT',
            url: `/posts/${id}`,
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
        apiSentData.post('/images', formData, {
                headers: {
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
        // console.log(typeof post.categories);
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
    // const setIDCategory = async (e) => {
    //     setPost({
    //         ...post,
    //         categories: e,
    //     });
    // }

    // if(post != null){
    //     let IDcategories =  post.categories.map((e, i) => {
    //         console.log(e);
    //         // return e.id;
    //     });
    //     setIDCategory(IDcategories).then(console.log(post.categories));
    //
    // }


    return (
        <div className="content-wrapper">
            { post !== null ? (
                <>

                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Sửa bài viết</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">
                                            <a href="#" onClick={() => history.goBack()}>All Posts</a>
                                        </li>
                                        <li className="breadcrumb-item active">Edit Post</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                    </section>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Tiêu đề</label>
                                <input type="text" defaultValue={post.post_title} onChange={(e) => handleChange(e)} className="form-control" placeholder="Enter the title's post..."/>
                            </div>
                            <Editor
                                apiKey='st1rdmijtzac8vx3cyhjdc2uemv974mtvt8igvv1dbglox18'
                                initialValue={post.post_content}
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
                                    <button className={'mt-2 btn btn-success'} onClick={SaveEditPost}>Đăng</button>
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
                                                                    <input type="checkbox"
                                                                           defaultChecked={post.categories.find((item, index) => {
                                                                               return item.id === element.id;
                                                                           }) ? true : false}
                                                                           className="form-check-input"
                                                                           value={element.id}
                                                                           onChange={handleSelect}/>
                                                                    <span className="custom-control-indicator"></span>
                                                                    <span
                                                                        className="custom-control-description">{element.category_name}</span>
                                                                </label>
                                                            </li>


                                                        );
                                                    })

                                                )
                                                }</ul>


                                        </div>
                                    </form>
                                </div>




                            </div>

                        </div>

                    </div>
                </>
            ) : (
                <div>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Sửa bài viết</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">
                                            <a href="#" onClick={() => history.goBack()}>All Posts</a>
                                        </li>
                                        <li className="breadcrumb-item active">Edit Post</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                    </section>
                    Loading
                </div>
            )}
        </div>
    );
}
export default EditPost;