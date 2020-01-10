import React, {useEffect} from 'react';
import {RecentPost} from '../../components/ArticlePost';
import {CategoryType} from '../../components/CategoryType';
import apiSent from '../../api/config';
import {useState} from 'reinspect';
import {Link} from 'react-router-dom';
import PostRow from "../../components/PostRow/PostRow";

const FrontEnd = () => {
    let [categories, setCategories] = useState(null);
    let [posts, setPost] = useState(null);
    let [offset, setOfset] = useState(5);
    let limit = 5;
    useEffect(() => {
        console.log('useeffect');
        onLoad();

    }, []);

    function onLoad() {
        console.log('onload');
        apiSent.get('/categories')
            .then(res => setCategories(res.data.success))
            .catch(e => console.log(e));
        apiSent.get('/posts?offset=0&limit=5')
            .then(res => setPost(res.data.success))
            .catch(e => console.log(e));
    }

    const loadMore = (offset) => {
        setOfset(offset + 5);
        // offset = offset + 5;
        // console.log(posts);
        apiSent.get(`/posts?offset=${offset}&limit=${limit}`)
            .then(res => {
                let objectOfObject = res.data.success;
                const arrayObject = Object.entries(objectOfObject).map(e => {
                    return e[1];
                });
                setPost([...posts, ...arrayObject]);
            })
            .catch(e => console.log(e));
    }
    console.log(posts);
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="section-title">
                        <h2 className="title">Recent posts</h2>
                    </div>
                </div>

                <RecentPost/>
                <RecentPost/>
                <RecentPost/>
                <RecentPost/>

                <div className="clearfix visible-md visible-lg"></div>

            </div>
            {categories !== null && (
                categories.map((category, index) => {
                    return <CategoryType key={index} categoryProps={category}/>
                })
            )}

            {
                posts !== null && (
                    posts.map((post, index) => {
                        return <PostRow key={index} post={post} />
                    })

                )
            }


            <div className="section-row loadmore text-center">
                <a onClick={(e) => loadMore(offset)} className="primary-button">Load More</a>
            </div>

        </div>
    )
}

export default FrontEnd;
