import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import PostTemplate from './PostTemplate';
import sentApi from '../../api/config';
import {useState} from "reinspect";

const CategoryType = ({categoryProps}) => {
    // let {slug} = useParams();

    let [posts, setPosts] = useState(null);
    useEffect(() => {
        onLoad();
    }, []);
    function onLoad(){
        sentApi.get(`/categories/${categoryProps.id}/posts`).then(res => {
            setPosts(res.data.success);
        })
    }
    console.log(posts);
    return (

        <div className="row">
            {posts !== null && posts.length > 0 && (
                <>
                    <div className="col-md-12">
                        <div className="section-title">
                            <h2 className="title">{categoryProps.category_name}</h2>
                        </div>
                    </div>
                    {posts.map((ePost, index) => {
                        return (
                                <PostTemplate key={index}  name={ePost.post_title} postsProps={ePost}/>
                        )
                    })}
                </>
            )}


        </div>
    );

}

export default (CategoryType);