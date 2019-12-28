import {FETCHING, SUCCESS, ERROR, ADD_USER} from "./actionTypes";

export const fetching = () => ({type: FETCHING });
export const success = (response) => ({type: SUCCESS , response});
export const error = (response) => ({type: ERROR, response });
export const add_user = (response) => ({type: ADD_USER, response});

