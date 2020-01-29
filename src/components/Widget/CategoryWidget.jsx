import React, {useEffect, useRef} from 'react';
import apiSent from '../../api/config';
import {useState} from 'reinspect';
import {Link} from 'react-router-dom';

const CategoryWidget = ({category}) => {

    return (
        category !== null && (
            <div className="aside-widget">
                <div className="section-title">
                    <h2 className="title">Categories</h2>
                </div>
                <div className="category-widget">
                    <ul>
                        {category.map((category, index) => {
                            return <li key={index}><Link to={`/categories/${category.category_slug}`}>{category.category_name} <span>{category.total_post}</span></Link></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    )
}
export default CategoryWidget;