import React, {useEffect, useRef} from 'react';
import {useState} from "reinspect";
import apiSent from "../../api/config";
import {Link} from "react-router-dom";

const CategoriesFooterWidget = ({categories}) => {

    return (
        categories !== null && (
            <div className="footer-widget">
                <h3 className="footer-title">Categories</h3>
                <div className="category-widget">
                    <ul>
                        {categories.map((category, index) => {
                            return <li key={index}><Link to={`/categories/${category.category_slug}`}>{category.category_name} <span>{category.total_post}</span></Link></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    );
}
export default CategoriesFooterWidget;