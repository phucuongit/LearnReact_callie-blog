import React, {Component} from 'react';
import PostTemplate from './PostTemplate';

class CategoryType extends Component {
    constructor(props){
        super(props);
        const { nameCategory } = this.props;
        this.state = {
            name: nameCategory.post_title,
            slug:  nameCategory.slug,
        }

    }


    render() {
        const { name, slug } = this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="section-title">
                        <h2 className="title">{name}</h2>
                    </div>
                </div>

                <PostTemplate name={name} slug={slug}/>



            </div>
        );
    }
}

export default (CategoryType);