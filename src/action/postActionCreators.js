import { GET_POST_FETCHING, GET_POST_SUCCESS, GET_POST_ERROR, GET_POST_BYID_FETCHING, GET_POST_BYID_SUCCESS, GET_POST_BYID_ERROR, REMOVE_POST_SUCCESS} from "./postActionTypes";


export const getPostFetching = () => ({type: GET_POST_FETCHING});
export const getPostError = (response) => ({type: GET_POST_ERROR, response});
export const getPostSuccess = (response) => ({type: GET_POST_SUCCESS, response});

export const getPostByIDFetching = () => ({type: GET_POST_BYID_FETCHING});
export const getPostByIDSuccess = (response) => ({type: GET_POST_BYID_SUCCESS, response});
export const getPostByIDError = (response) => ({type: GET_POST_BYID_ERROR, response});

export const removePost = (response)    => ({type: REMOVE_POST_SUCCESS, response});

