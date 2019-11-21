import React, {Component} from 'react';
import PostTemplate from './PostTemplate';

class CategoryType extends Component {
    constructor(props){
        super(props);
        const { nameCategory } = this.props;
        //console.log(this.props);
        this.state = {
            name: nameCategory,
        }

    }


    render() {
        const { name } = this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="section-title">
                        <h2 className="title">{name}</h2>
                    </div>
                </div>

                <PostTemplate/>
                <PostTemplate/>
                <PostTemplate/>


            </div>
        );
    }
}

export default (CategoryType);