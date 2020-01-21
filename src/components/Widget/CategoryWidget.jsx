import React, {useEffect, useRef} from 'react';
import apiSent from '../../api/config';
import {useState} from 'reinspect';
import {Link} from 'react-router-dom';

const CategoryWidget = () => {
    let [listCategory, setListCategory] = useState(null);
    function useIsMountedRef(){
        const isMountedRef = useRef(null);
        useEffect(() => {
            isMountedRef.current = true;
            return () => isMountedRef.current = false;
        });
        return isMountedRef;
    }
    const isMountedRef = useIsMountedRef();
    useEffect(() => {
        onLoad();
    }, []);
    function onLoad(){
        apiSent.get('/categories?limit=5').then(res => {
            if(isMountedRef.current) {
                setListCategory(res.data.success);
            }
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