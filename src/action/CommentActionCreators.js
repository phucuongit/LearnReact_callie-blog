import {COMMENT_FETCHING, COMMENT_SUCCESS, COMMENT_ERROR, COMMENT_ADD, REPLY_ADD} from "./CommentActionTypes";

export const comment_fetching = () => ({type: COMMENT_FETCHING});
export const comment_success = (comments) => ({type: COMMENT_SUCCESS, comments});
export const comment_error = (comments) => ({type: COMMENT_ERROR, comments});

export const addComment = (comments) => ({type: COMMENT_ADD, comments});
export const addReply = (comments) => ({type: REPLY_ADD, comments});