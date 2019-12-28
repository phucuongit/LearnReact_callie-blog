import { FETCHING , SUCCESS, ERROR  } from '../action/actionTypes';
import {
    GET_POST_BYID_ERROR,
    GET_POST_BYID_FETCHING,
    GET_POST_BYID_SUCCESS,
    GET_POST_FETCHING,
    GET_POST_SUCCESS,
    REMOVE_POST_SUCCESS
} from "../action/postActionTypes";

export const initialState = {
    statusPost: null,
    responsePost: null,
};

export const PostReducer = (state = initialState, { type, responsePost, id } = {}) => {

    switch (type) {
        case FETCHING:
            return {
                ...initialState,
                statusPost:  FETCHING,
            };
        case SUCCESS:
            return {
                ...state,
                statusPost: SUCCESS,
                responsePost
            };
        case ERROR:
            return {
                ...state,
                statusPost: ERROR,
                responsePost,
            };
        case GET_POST_FETCHING:
            return {
                ...initialState,
                statusPost: FETCHING,
            };

        case GET_POST_SUCCESS:
            return {
                ...state,
                statusPost: SUCCESS,
                responsePost: responsePost.data.success
            };
        case GET_POST_BYID_FETCHING:
            return {
                ...state,
                statusPost: FETCHING,
            }
        case GET_POST_BYID_SUCCESS:

            return {
                ...state,
                statusPost: SUCCESS,
                responsePost: [responsePost.data.success],
            };
        case GET_POST_BYID_ERROR:
            return {
                ...state,
                statusPost: ERROR,
            }
        case REMOVE_POST_SUCCESS:
            return {
                ...state,
                statusPost: SUCCESS,
                responsePost: state.responsePost.filter(post => post.id !== responsePost),
            }
        default:
            return { ...state };
    }
}
export default PostReducer;