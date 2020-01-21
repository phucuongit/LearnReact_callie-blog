import React, {useEffect, useRef} from 'react';
import {useState} from "reinspect";
import apiSent from "../../api/config";
import {Link} from "react-router-dom";

const TagsFooterWidget = () => {
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
    }, [isMountedRef]);
    function onLoad(){
        apiSent.get('/categories?limit=5').then(res => {
            if(isMountedRef.current) {
                setListCategory(res.data.success);
            }
        });
    }
    return (
        listCategory !== null && (
            <div className="footer-widget">
                <h3 className="footer-title">Tags</h3>
                <div className="tags-widget">
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
export default TagsFooterWidget;