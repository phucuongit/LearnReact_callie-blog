import Pusher from "pusher-js";
import React from "react";
import {Link} from 'react-router-dom';
import HtmlParser from "react-html-parser";
import {BASE_URL} from "../../api/config";
const NOTIFICATION_TYPES = {
    newCommentPost: "App\\Notifications\\UserCommentedPost",
};

const pusher = new Pusher('8c29552a7a96791ead30', {
    cluster: 'ap1',
    forceTLS: true
});
export const channel = pusher.subscribe('App.User.3');

const routeNotification = (notification) => {
    let to = '?read=';
    if(NOTIFICATION_TYPES.newCommentPost === notification.type){
        to = notification.post_slug + '?read=' + notification.id;
    }
    return '/' + to;
}
const notificationText = (notification) => {
    let text = '';
    if(NOTIFICATION_TYPES.newCommentPost === notification.type){
        const namePost = notification.post_name;
        const userComment = notification.user_comment;

        text += `<p class="text-sm"><strong>${userComment}</strong>` + ' just comments the ' + `<strong>${namePost}</strong>` +  ' post of you</p>';
    }
    return text;
}

export const makeNotification = (notification, index) => { // truyền 1 chuỗi thông báo đến vầ tạo route link đến
    let to = routeNotification(notification);
    let message = notificationText(notification);
    const user_avatar = notification.user_avatar;
    return  (<Link key={index} to={to} target={'_blank'} className="dropdown-item">
                <div className="media">
                    <img src={(user_avatar == null) ? '/dist/img/avatar_user.png' : BASE_URL + user_avatar} alt="User Avatar" className="img-size-50 mr-3 img-circle"/>
                    <div className="media-body">
                        <h3 className="dropdown-item-title">
                            Just have a comment
                            <span className="float-right text-sm text-danger"><i
                                className="fas fa-star"/></span>
                        </h3>
                        {HtmlParser(message)}
                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"/> 4
                            Hours Ago</p>
                    </div>
                </div>
            </Link>);
}
