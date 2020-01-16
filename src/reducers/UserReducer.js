import {USER_FETCHING, USER_SUCCESS } from '../action/userActionTypes';

export const initialUserState = {
    status: null,
    response: null,
}

export const UserReducer = (state = initialUserState, {type, response} = {}) => {
    switch (type) {
        case USER_FETCHING:
            return {
                ...initialUserState,
                status: USER_FETCHING,
            }
        case USER_SUCCESS:
            return {
                ...state,
                status: USER_SUCCESS,
                response: response,
            }
    }
}