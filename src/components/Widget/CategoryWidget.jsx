import React, {useEffect} from 'react';
import apiSent from '../../api/config';
import {useState} from 'reinspect';
import {Link} from 'react-router-dom';

const CategoryWidget = () => {
    let [listCategory, setListCategory] = useState(null);
    useEffect(() => {
        onLoad();
    }, []);
    function onLoad(){
        apiSent.get('/categories?limit=5').then(res => {
            setListCategory(res.data.success);
        });
    }
    return (
        listCategory !== null && (
            <div className="aside-widget">
                <div className="section-title">
                    <h2 className="title">Categories</h2>
                </div>
                <div className="category-widget">
                    <ul>
                        {listCategory.map((category, index) => {
                            return <li key={index}><Link to={`/categories/${category.category_slug}`}>{category.category_name} <span>{category.posts_count}</span></Link></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    )
}
export default CategoryWidget;