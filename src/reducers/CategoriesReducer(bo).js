import { FETCHING , SUCCESS, ERROR  } from '../action/actionTypes';
import {
    GET_ALL_CATEGORY_FETCHING,
    GET_ALL_CATEGORY_SUCCESS,
    GET_ALL_CATEGORY_ERROR,
} from "../action/CategoryActionTypes";

export const initial= {
    category: {
        status: null,
        response: null,
    }
};

export const CategoriesReducerBo = (state = initial, { type, response } = {}) => {

    switch (type) {
        case GET_ALL_CATEGORY_FETCHING:
            return {
                ...initial,
                category: { status:  GET_ALL_CATEGORY_FETCHING },
            };
        case GET_ALL_CATEGORY_SUCCESS:

            return {
                ...state,
                category: { status: GET_ALL_CATEGORY_SUCCESS, response },

            };
        case GET_ALL_CATEGORY_ERROR:
            return {
                ...state,
                category: { status: ERROR, response},
            };

        default:
            return { ...state };
    }
}
export default CategoriesReducerBo;