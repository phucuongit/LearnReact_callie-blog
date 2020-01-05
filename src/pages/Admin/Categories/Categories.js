import React, {useEffect, useContext} from 'react';
import {CategoriesReducerBo,initial}  from '../../../reducers/CategoriesReducer(bo)';
import {useReducer, useState} from "reinspect";
import {GET_ALL_CATEGORY_FETCHING, GET_ALL_CATEGORY_SUCCESS, GET_ALL_CATEGORY_ERROR} from '../../../action/CategoryActionTypes';
import {CateogryContext, DashBoardContext} from '../../../Context';

import {getCategoriesFetching, getCategoriesSuccess, getCategoriesError, removeCategory, editCategory} from '../../../action/CategoryActionCreators';
import axios from "axios";
import Cookies from "js-cookie";
import apiSentDate from '../../../api/config';
import ValidatedAddUser from "../../../components/ValidatedAddUser/ValidatedAddUser";
import ValidatedAddCategory from "../../../components/ValidatedAddCategory/ValidatedAddCategory";

const Categories = () => {

    const [ state, dispatch ] = useContext(DashBoardContext);
    const [ newCategory, setCategory ] = useState({name: '', slug: ''});
    const [ isEditing, setEditCategory ] = useState({edit: false, id: ''});
    useEffect(() => {
        onLoad();

    }, []);
    const onLoad = async () => {
        dispatch(getCategoriesFetching());
        try{
            const response = await axios({ method: 'GET', url: 'http://localhost:8000/api/categories', headers: {Authorization: Cookies.get('access_token')} });
            dispatch(getCategoriesSuccess(response));

        }catch(e) {
            dispatch(getCategoriesError(e));
            console.log(e);
        };
    };
    const handleAddCategory = (e) => {
        e.preventDefault();
        console.log(newCategory);
    };
    const handleRemoveCategory = (id, e) => {
        dispatch(removeCategory(id));
        axios({
            url: `http://localhost:8000/api/categories/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: Cookies.get('access_token'),
            }
        }).then(res => {
            alert('This category is deleted');
        }).catch(e => {
            console.log(e);
        })


    };
    const handleEditCategory = (id,e) => {
        setEditCategory({edit: !isEditing.edit, id: id});
    }
    const changeName = (e) => {
        setCategory({...newCategory,name: e.target.value });
    }
    const changeSlug = (e) => {
        setCategory({...newCategory,slug: e.target.value });
    }
    function str_slug(Text)
    {
        return Text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'');
    }
    const handleChangeCategoryName = (id,e) => {
        setCategory({
            ...newCategory,
            name: e.target.value,
            slug: str_slug(e.target.value),
        });
    }
    const handleSaveCategory = (id, e) => {
        apiSentDate({
            url: `/categories/${id}`,
            method: 'PUT',
            data: newCategory,
        }).then(res => {
            dispatch(editCategory({...newCategory, id: id}));
            alert(res.data.success);
        }).catch(e => {
            console.log(e);
        });
        setEditCategory({edit: !isEditing.edit});
    }
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Chuyên mục</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Chuyên mục</li>
                            </ol>
                        </div>
                    </div>
                </div>

            </section>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Thêm chuyên mục</h3>
                                </div>
                                <ValidatedAddCategory/>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Danh sách chuyên mục</h3>
                                </div>

                                <div className="card-body p-0">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th style={{"width": "10px"}}>#</th>
                                            <th>Tên</th>
                                            <th>Chuỗi đường dẫn tĩnh</th>
                                            <th style={{"width": "140px"}}>Số lượng post</th>
                                            <th style={{"width": "100px"}}>Chỉnh sửa</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {state.status === GET_ALL_CATEGORY_FETCHING &&
                                        (
                                            <tr>
                                                <th>Loading</th>
                                                <th>Loading</th>
                                                <th>Loading</th>
                                                <th>Loading</th>
                                                <th>Loading</th>
                                            </tr>

                                        )
                                        }


                                        {state.status === GET_ALL_CATEGORY_SUCCESS &&
                                        (
                                            state.response.map((category, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{category.id}</td>
                                                            <td>
                                                                { (isEditing.edit &&  isEditing.id === category.id )  ?
                                                                    (
                                                                        <input defaultValue={category.category_name} name='category_name' placeholder={'Enter category name'} onChange={(e) => handleChangeCategoryName(category.id, e)} />
                                                                    ) :
                                                                    (
                                                                        category.category_name
                                                                    )
                                                                }
                                                            </td>
                                                            <td>
                                                                { (isEditing.edit &&  isEditing.id === category.id )  ?
                                                                    (
                                                                        <input value={newCategory.slug} name='category_name' placeholder={'Your slug category is auto field by System'} disabled/>
                                                                    ) :
                                                                    (
                                                                        category.category_slug
                                                                    )
                                                                }
                                                            </td>

                                                            <td><span>{category.count_post}</span></td>
                                                            <td>
                                                                {isEditing.edit && isEditing.id === category.id ?
                                                                    ( <a className="btn btn-warning" onClick={(e) => handleSaveCategory(category.id, e)}>Save</a>)
                                                                    :

                                                                    ( <a className="btn btn-warning" onClick={(e) => handleEditCategory(category.id, e)}>Sửa</a> )
                                                                }

                                                                <a className="btn btn-danger" onClick={(e) => handleRemoveCategory(category.id, e)}>Xóa</a>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};
export default Categories;