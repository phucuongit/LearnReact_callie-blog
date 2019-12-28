import React, { useContext, useCallback,useMemo } from "react";
import axios from "axios";
import reducer, {initialState} from "../reducers/reducer";
import {fetching, success,error} from "../action/actionCreators";
import {useReducer} from "reinspect";
import {DashBoardContext} from "../Context";

const useApiRequest = (endpoint, { verb = 'get', params = {} } = {}) => {

    const [ state, dispatch ] = useContext(DashBoardContext);

    const makeRequest = useCallback(async () => {
        dispatch(fetching());
        try {
            const response = await axios({ method: verb, url: endpoint, headers: params });
            dispatch(success(response));
        } catch (e) {
            dispatch(error(e));
        }
    }, [endpoint, verb, params]);
    return [state, makeRequest];
};

export default useApiRequest;