import React, {Component, useEffect} from 'react';
import hot_post_1 from '../../issets/img/hot-post-1.jpg';
import hot_post_2 from '../../issets/img/hot-post-2.jpg';
import hot_post_3 from '../../issets/img/hot-post-3.jpg';
import apiSent from "../../api/config";
import {useState} from "reinspect";
import {Link} from "react-router-dom";
import PostThumb from "../PostThumb/PostThumb";
const HotPost = () => {
        let [PopularPost, setPopularPost] = useState(null);

        useEffect(() => {
            onLoad();
        }, []);

        function onLoad() {
            apiSent.get('/posts/filter?PopularPost=1&&limit=3')
                .then(res => setPopularPost(res.data.success))
                .catch(e => console.log(e));
        }
        return (

            <div className="section">

                <div className="container">

                    <div id="hot-post" className="row hot-post">
                        <div className="col-md-8 hot-post-left">
                        {
                            PopularPost !== null && (
                                <PostThumb post={PopularPost[0]}/>
                            )
                        }
                        </div>
                        <div className="col-md-4 hot-post-right">
                            {
                                PopularPost !== null && (
                                    PopularPost.map((post, index) => {
                                        if(index < 2){
                                            return (<PostThumb key={index}post={post}/>)
                                        }

                                    })
                                )
                            }



                        </div>
                    </div>

                </div>

            </div>

        );
}

export default (HotPost);