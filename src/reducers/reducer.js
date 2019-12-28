import { FETCHING , SUCCESS, ERROR , DELETE_USER, ADD_USER, EDIT_USER, UPDATE_USER_SUCCESS } from '../action/actionTypes';
import {
    GET_POST_BYID_ERROR,
    GET_POST_BYID_FETCHING,
    GET_POST_BYID_SUCCESS,
    GET_POST_FETCHING,
    GET_POST_SUCCESS,
    REMOVE_POST_SUCCESS
} from "../action/postActionTypes";
import {
    ADD_CATEGORY,
    GET_ALL_CATEGORY_ERROR,
    GET_ALL_CATEGORY_FETCHING,
    GET_ALL_CATEGORY_SUCCESS,
    REMOVE_CATEGORY_BY_ID
} from "../action/CategoryActionTypes";

export const initialState = {
    status: null,
    response: null,
};

export const reducer = (state = initialState, { type, response, id } = {}) => {

    switch (type) {
        case FETCHING:
            return {
                ...initialState,
                status:  FETCHING,
            };
        case SUCCESS:
            return {
                ...state,
                status: SUCCESS,
                response
            };
        case ERROR:
            return {
                ...state,
                status: ERROR,
                response,
            };
        case DELETE_USER:
            let NewUser  = (response.data.success.filter((element, index) => {return element.id !== id }));
            response.data.success = NewUser;

            return {
                ...state,
                status: SUCCESS,
                response,
            };
        case ADD_USER:

            let newUser = {
                id: (state.response != null) ? state.response.data.success[state.response.data.success.length -1 ].id + 1 : 1,
                name: response.name,
                email: response.email,
                email_verified_at: null,
                roles: response.roles,
                created_at: Date.now(),
                updated_at: Date.now(),
            };

            if(state.response != null){
                state.response.data.success = [...state.response.data.success, newUser];
            }else{
                state.response = {data: {success: [ newUser] }};
            }

            return {
                ...state,
                status: SUCCESS,
            };
        case EDIT_USER:

            return {
                ...state,
                status: SUCCESS,
            };
        case UPDATE_USER_SUCCESS:

            state.response.data.success.forEach((element , index) => {

                if(element.id === response.id){
                    element.name = response.user.name;
                    element.roles = parseInt(response.user.roles);
                }
            });
            // state.response.data.success = state.response.data.success.filter((user) => user.id !== response.id);
            // Object.assign({}, response.user);
            return {
                ...state,
                status: SUCCESS,
            };

        case GET_POST_FETCHING:
            return {
                ...initialState,
                status: GET_POST_FETCHING,
            };

        case GET_POST_SUCCESS:
            return {
                ...state,
                status: GET_POST_SUCCESS,
                response: response.data.success
            };
        case GET_POST_BYID_FETCHING:
            return {
                ...state,
                status: FETCHING,
            }
        case GET_POST_BYID_SUCCESS:

            return {
                ...state,
                status: SUCCESS,
                response: [response.data.success],
            };
        case GET_POST_BYID_ERROR:
            return {
                ...state,
                status: ERROR,
            }
        case REMOVE_POST_SUCCESS:
            return {
                ...state,
                status: GET_POST_SUCCESS,
                response: state.response.filter(post => post.id !== response),
            }
        case GET_ALL_CATEGORY_FETCHING:
            return {
                ...state,
                status: GET_ALL_CATEGORY_FETCHING,
                response: null
            }
        case GET_ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                status: GET_ALL_CATEGORY_SUCCESS,
                response: response.data.success
            }
        case GET_ALL_CATEGORY_ERROR:
            return {
                ...state,
                status: GET_ALL_CATEGORY_SUCCESS,

            }
        case REMOVE_CATEGORY_BY_ID:
            return{
                ...state,
                status: GET_ALL_CATEGORY_SUCCESS,
                response: state.response.filter((element, index) => element.id !== response),
            }
        case ADD_CATEGORY:

            response = {
                id: (state.response !== null) ? state.response[state.response.length - 1 ].id + 1 : 1,
                category_name: response.name,
                category_slug: response.slug,

            }

            return {
                ...state,
                status: GET_ALL_CATEGORY_SUCCESS,
                response: [...state.response, response]
            }
        default:
            return { ...state };
    }
}
export default reducer;