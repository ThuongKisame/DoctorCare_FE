import * as actionTypes from '@/actions/actionTypes';
const initialState = {
    refreshToken: null,
    accessToken: null,
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case actionTypes.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload,
            };
        case actionTypes.SET_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
