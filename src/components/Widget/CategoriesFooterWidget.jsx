import React, {useEffect} from 'react';
import {useState} from "reinspect";
import apiSent from "../../api/config";
import {Link} from "react-router-dom";

const CategoriesFooterWidget = () => {
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
            <div className="footer-widget">
                <h3 className="footer-title">Categories</h3>
                <div className="category-widget">
                    <ul>
                        {listCategory.map((category, index) => {
                            return <li key={index}><Link to={`/categories/${category.category_slug}`}>{category.category_name} <span>{category.posts_count}</span></Link></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    );
}
export default CategoriesFooterWidget;