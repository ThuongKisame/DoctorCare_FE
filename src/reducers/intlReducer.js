import * as actionTypes from '@/actions/actionTypes';

const initialState = {
    language: 'vi',
};

const intlReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            };
        default:
            return state;
    }
};

export default intlReducer;
