import {FETCHING_SETTINGS, SUCCESS_SETTINGS, UPDATE_SETTINGS} from "./SettingActionTypes";

export const fetchingSettings = () => ({type: FETCHING_SETTINGS});
export const successSettings = (response) => ({type: SUCCESS_SETTINGS, response});
export const updateSettings = (response) => ({type: UPDATE_SETTINGS, response});