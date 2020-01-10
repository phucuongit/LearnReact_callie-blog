import React , {useEffect} from 'react';
import hotPost3 from './img/hot-post-3.jpg';
import apiSent from '../../api/config';
import {useParams} from 'react-router-dom';
import {useState} from 'reinspect';
import {Link} from 'react-router-dom';
import PostRow from "../../components/PostRow/PostRow";

const Categories = () => {
    let {slug} = useParams();
    let [query , setQuery ] = useState({
        limit: 5,
        offset: 0,
    });
    useEffect(() => {
        onLoad();
    }, [query.limit]);
    let [category, setCategory] = useState(null);

    function onLoad(){
        apiSent(`/categories/${slug}?limit=${query.limit}&&offset=${query.offset}`).then(res => {
            setCategory(res.data);
        });
    }
    function loadMore () {
        setQuery({limit: query.limit + 5});
    }
    console.log(category);
    return (
        <div className="section">
            {console.log('render')}
            <div className="container">

                <div className="row">
                    <div className="col-md-12">
                        {category !== null && (
                            <div className="post post-thumb">
                                <a className="post-img" href="blog-post.html"><img src={hotPost3} alt=""/></a>
                                <div className="post-body">
                                    <div className="post-category">
                                        {
                                            category.PopularPosts.CategoriesPost.map((categoryOfPost,index) => {
                                                if(index < 3){
                                                    return <Link key={index} to={`/categories/${categoryOfPost.category_slug}`}>{categoryOfPost.category_name}</Link>
                                                }
                                            })
                                        }
                                    </div>
                                    <h3 className="post-title title-lg"><Link to={category.PopularPosts.slug}>{category.PopularPosts.post_title}</Link></h3>
                                    <ul className="post-meta">
                                        <li><a href="author.html">{category.PopularPosts.NameAuthor}</a></li>
                                        <li>{category.PopularPosts.updated_at}</li>
                                    </ul>
                                </div>
                            </div>
                        )}


                        <div className="row">
                            {category !== null && (
                                category.newPosts.map((newPost, index) => {
                                    return (
                                        <PostRow key={index} post={newPost} className={'col-md-6'}/>
                                    )
                                })
                            )}

                            <div className="clearfix visible-md visible-lg"></div>

                        </div>

                        {
                            category !== null && (
                                category.normalPost.map((post, index) => {
                                    return <PostRow key={index} post={post} />
                                })
                            )
                        }




                        <div className="section-row loadmore text-center">
                            <a onClick={(e) => loadMore()} className="primary-button">Load More</a>
                        </div>
                    </div>


                </div>

            </div>

        </div>
    );
}
export default Categories;