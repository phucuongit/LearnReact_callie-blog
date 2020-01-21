import React, {useContext} from 'react';
import avatar3 from './img/avatar-2.jpg';
import {useState} from 'reinspect';
import AddComments from "./AddComments";
import AddReply from "./AddReply";
import {CommentContext} from "../../Context";

const ShowComments = ({commentProps, post_id}) => {
    let [comments, dispatch] = useContext(CommentContext);
    const time_left = (time) => {
        let actualDate = new Date(Date.now());

        // Split timestamp into [ Y, M, D, h, m, s ]
        var t = time.split(/[- :]/);

// Apply each element to the Date function
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
// -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)
        let time_left = (actualDate - d) / 1000;
        var sec_num = parseInt(time_left, 10); // don't forget the second param
        var dates = Math.floor(sec_num / (3600 * 24));
        sec_num = (sec_num - dates * (3600 * 24));
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        if (dates < 10) {
            dates = "0" + dates;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return dates + '-' + hours + ':' + minutes + ':' + seconds;
    };
    let [isReply, setIsReply] = useState({status: false, id: ''});
    const changStatusReply = (id) => {
        setIsReply({status: !isReply.status, id: id});
    };
    return (

        <div className="media">
            <div className="media-left">
                <img className="media-object" src={avatar3} alt=""/>
            </div>
            <div className="media-body">
                <div className="media-heading">
                    <h4>{commentProps.userComment}</h4>
                    <span className="time">{time_left(commentProps.updated_at)} ago</span>
                </div>
                <p>{commentProps.body}</p>
                <a onClick={(e) => changStatusReply(commentProps.id)} className="reply">Reply</a>
                {isReply.status === true && isReply.id === commentProps.id && (
                    <AddReply callback={changStatusReply} comment_id={commentProps.id} post_id={post_id}/>
                )}
                {
                    (typeof commentProps.replies != 'undefined'  && (
                        commentProps.replies.map((reply, index) => {
                            return <ShowComments key={index} commentProps={reply} post_id={post_id}/>
                        })
                    ))
                }
            </div>
        </div>

    )
}
export default ShowComments;