const initialState = {
    isFetching: true,
    details: {},
    newDetails:{},
    error: null
};

export function reducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case "fetching":
            return { ...state, isFetching: true };
        case "success":
            return { ...state, isFetching: false, details: action.response };
        case "postData":
            return { ...state, newDetails: action.response };
        default:
            return state;
    }
}
