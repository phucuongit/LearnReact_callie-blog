import React, {useEffect, useRef} from 'react';
import apiSent from '../../api/config';
import {useState} from 'reinspect';
import {Link} from 'react-router-dom';
import widget_3 from "../../issets/img/widget-3.jpg";

const PopularPostsWidget = () => {
    let [popularPosts, setPopularPosts] = useState(null);
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
        apiSent.get('/posts/filter?limit=4&PopularPost=1').then(res => {
            if(isMountedRef.current) {
                setPopularPosts(res.data.success);
            }
        });
    }
    return (
        popularPosts !== null && (

            <div className="aside-widget">
                <div className="section-title">
                    <h2 className="title">Popular Posts</h2>
                </div>
                {
                    popularPosts.map((post, index) => {
                        return (<div key={index} className="post post-widget">
                            <a className="post-img" href="blog-post.html"><img src={(post.image !== null) ? post.image.url : '/dist/img/loading1.gif'} alt=""></img></a>
                            <div className="post-body">
                                <div className="post-category">
                                    {
                                        post.categories.map((category, index) =>  {
                                            if(index < 2) {
                                                return <Link key={index}
                                                             to={category.category_slug}>{category.category_name}</Link>
                                            }
                                        })
                                    }
                                </div>
                                <h3 className="post-title">
                                    <Link to={post.slug}>
                                        {post.post_title}
                                    </Link>
                                </h3>
                            </div>

                        </div>)
                    })
                }



            </div>
        )
    )
}
export default PopularPostsWidget;