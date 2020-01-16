import {FETCHING_SETTINGS, SUCCESS_SETTINGS, UPDATE_SETTINGS} from '../action/SettingActionTypes';

export const initialStateSettings = {
    status: null,
    response: null,
};

export const SettingReducer = (state = initialStateSettings,{type, response} = {}) => {
    switch (type) {
        case FETCHING_SETTINGS: {
            return {
                ...initialStateSettings,
                status: FETCHING_SETTINGS
            }
        }
        case SUCCESS_SETTINGS: {
            return {
                ...state,
                status: SUCCESS_SETTINGS,
                response: response,
            }
        }
        case UPDATE_SETTINGS: {
            return {
                ...state,
                status: SUCCESS_SETTINGS,
                response: response,
            }
        }
    }
};