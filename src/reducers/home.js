
export default (state={}, action) => {
    switch(action.type) {
        case 'HOME_PAGE_LOADED':
            //console.log(action.data);
            return {
                ...state,
                postCategory: action.data.data,
            };

        default:
            return state;
    }
};