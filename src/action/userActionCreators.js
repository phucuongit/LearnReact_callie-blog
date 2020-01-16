import {UPDATE_USER_SUCCESS, USER_FETCHING, USER_SUCCESS} from './userActionTypes';

export const updateUser = (response) => ({type: UPDATE_USER_SUCCESS, response});
export const user_success = (response) => ({type: USER_SUCCESS, response});
export const user_fetching = () => ({type: USER_FETCHING});
