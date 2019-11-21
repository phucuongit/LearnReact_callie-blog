import React, {Component} from 'react';
import  {RecentPost}  from '../../components/ArticlePost';
import {CategoryType} from '../../components/CategoryType';
import { connect } from 'react-redux';
import axios from 'axios';
class FrontEnd extends Component {
    componentDidMount(){
        const {onLoad} = this.props;
        axios.get('http://127.0.0.1:8000/posts')
            .then(res => onLoad(res));
    }
    render() {
        const { CategoryTypes } = this.props;

        console.log( (CategoryTypes) );

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
                {/*{*/}
                {/*    CategoryTypes.map(posts => {*/}
                {/*        return(*/}
                {/*            <CategoryType nameCategory={'asd'}/>*/}
                {/*        );*/}
                {/*    })*/}
                {/*}*/}
                {/*{*/}
                {/*    for(let key in CategoryTypes){*/}
                {/*     */}
                {/*        <CategoryType nameCategory={{CategoryTypes[key]}}/>*/}
                {/*    }*/}
                {/*}*/}


                {/*{ CategoryTypes.map(name => {*/}
                {/*    return (<CategoryType nameCategory={'cuong'}/>);*/}
                {/*}) }*/}

                {/*<CategoryType nameCategory={"fasion"}/>*/}
                {/*<CategoryType nameCategory={"dragon"}/>*/}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    CategoryTypes: state.home.postCategory,
});

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FrontEnd);
