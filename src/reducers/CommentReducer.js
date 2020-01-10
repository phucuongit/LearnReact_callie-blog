import {COMMENT_ADD, COMMENT_ERROR, COMMENT_FETCHING, COMMENT_SUCCESS, REPLY_ADD} from '../action/CommentActionTypes';

export const initialState = {
    status: null,
    comments: null,
};

export const  CommentReducer = (state = initialState, {type, comments} = {}) => {
        switch (type) {
            case COMMENT_FETCHING:
                return {
                    ...initialState,
                    status: COMMENT_FETCHING,
                };
            case COMMENT_SUCCESS:
                return {
                    ...state,
                    status: COMMENT_SUCCESS,
                    comments: comments,
                }
            case COMMENT_ERROR:
                return {
                    ...state,
                    status: COMMENT_ERROR,
                }
            case COMMENT_ADD:

                return {
                    ...state,
                    status: COMMENT_SUCCESS,
                    comments: [ ...state.comments, comments],
                };
            case REPLY_ADD:
                state.comments.map((comment, index) => {
                    // if(comment.id === comments.parent_id){
                        comment.replies = [...comment.replies, comments];
                    // }
                });
                return {
                    ...state,
                    status: COMMENT_SUCCESS,
                }
            default:
                return{
                    ...state,
                }
        }
}
export default CommentReducer;