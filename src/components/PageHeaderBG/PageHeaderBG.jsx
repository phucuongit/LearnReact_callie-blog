import React, {useEffect} from 'react';
import header2 from "../../pages/Categories/img/header-2.jpg";
import {useParams} from "react-router-dom";
import {useState} from "reinspect";
import apiSent from "../../api/config";

const PageHeaderBG = () => {
    let {slug} = useParams();
    useEffect(() => {
        onLoad();
    }, []);
    let [category, setCategory] = useState(null);

    function onLoad() {
        apiSent(`/categories/${slug}`).then(res => {
            setCategory(res.data);
        });
    }
        return (
        <div className="page-header">
            <div className="page-header-bg" style={{"background-image": `url(${header2})`}} data-stellar-background-ratio="0.5"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-1 col-md-10 text-center">
                        {category !== null && (
                            <h1 className="text-uppercase">{category.category.category_name}</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PageHeaderBG;