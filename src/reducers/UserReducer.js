import {USER_FETCHING, USER_SUCCESS,EDIT_USER_SUCCESS } from '../action/userActionTypes';

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
        case EDIT_USER_SUCCESS:

            if(response !== null){
                let {username, education, location, skills} = response;

                if(typeof username !== 'undefined' && username !== null){
                    state.response.success.name = username;
                }
                if(typeof education !== 'undefined'){
                    state.response.success.profile.education = education;
                }
                if(typeof location !== 'undefined'){
                    state.response.success.profile.location = location;
                }
                if(typeof skills !== 'undefined'){
                    skills = skills.split(',');
                    state.response.success.profile.DSkill = skills;
                }
            }

            return {
                ...state,
                status: USER_SUCCESS,
            }
    }
}