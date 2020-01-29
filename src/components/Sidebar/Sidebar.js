import React, {Component} from 'react';
import widget_3 from '../../issets/img/widget-3.jpg';
import ad_3 from '../../issets/img/ad-3.jpg';
import CategoryWidget from '../Widget/CategoryWidget';
import PopularPostsWidget from "../Widget/PopularPostsWidget";

class Sidebar extends Component {
    constructor(props) {
        super();
        this.categories = props.categories;
    }
    render() {
        return (
            <div>
                <div className="aside-widget text-center">
                    <a href="#" style={{"display": "inline-block", "margin": "auto"}}>
                        <img className="img-responsive" src={ad_3} alt=""/>
                    </a>
                </div>


                <CategoryWidget category={this.categories}/>

                <PopularPostsWidget/>


            </div>
        );
    }
}

export default (Sidebar);