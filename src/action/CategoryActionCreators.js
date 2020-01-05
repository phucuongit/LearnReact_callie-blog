import {GET_ALL_CATEGORY_FETCHING, GET_ALL_CATEGORY_SUCCESS, GET_ALL_CATEGORY_ERROR, REMOVE_CATEGORY_BY_ID, ADD_CATEGORY, EDIT_CATEGORY} from '../action/CategoryActionTypes';

export const getCategoriesFetching = () => ({type: GET_ALL_CATEGORY_FETCHING});
export const getCategoriesSuccess = (response) => ({type: GET_ALL_CATEGORY_SUCCESS, response});
export const getCategoriesError = (response) => ({type: GET_ALL_CATEGORY_ERROR, response});

export const removeCategory = (response) => ({type: REMOVE_CATEGORY_BY_ID, response});
export const addCategory = (response) => ({type: ADD_CATEGORY, response});
export const editCategory = (response) => ({type: EDIT_CATEGORY, response})