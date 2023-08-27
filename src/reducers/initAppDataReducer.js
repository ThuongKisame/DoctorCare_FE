import * as actionTypes from '@/actions/actionTypes';

const initialState = {
    gender: { genders: [], loading: false, error: null, onload: false },
    price: { prices: [], loading: false, error: null, onload: false },
    role: { roles: [], loading: false, error: null, onload: false },
    position: { positions: [], loading: false, error: null, onload: false },
    time: { times: [], loading: false, error: null, onload: false },
    payment: { payments: [], loading: false, error: null, onload: false },
    province: { provinces: [], loading: false, error: null, onload: false },
    loading: false,
};

const initAppDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                gender: {
                    ...state.gender,
                    loading: true,
                    onload: true,
                },
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                gender: {
                    ...state.gender,
                    genders: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case actionTypes.FETCH_GENDER_FAILURE:
            return {
                ...state,
                role: {
                    ...state.role,
                    roles: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                role: {
                    ...state.role,
                    loading: true,
                    onload: true,
                },
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                role: {
                    ...state.role,
                    roles: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case actionTypes.FETCH_ROLE_FAILURE:
            return {
                ...state,
                role: {
                    ...state.role,
                    roles: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                position: {
                    ...state.position,
                    loading: true,
                    onload: true,
                },
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                position: {
                    ...state.position,
                    positions: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case actionTypes.FETCH_POSITION_FAILURE:
            return {
                ...state,
                position: {
                    ...state.position,
                    positions: [],
                    loading: false,
                    error: action.payload,
                },
            };
        //
        case actionTypes.FETCH_TIME_START:
            return {
                ...state,
                time: {
                    ...state.time,
                    loading: true,
                    onload: true,
                },
            };
        case actionTypes.FETCH_TIME_SUCCESS:
            return {
                ...state,
                time: {
                    ...state.time,
                    times: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case actionTypes.FETCH_TIME_FAILURE:
            return {
                ...state,
                time: {
                    ...state.time,
                    times: [],
                    loading: false,
                    error: action.payload,
                },
            };
        //price
        case actionTypes.FETCH_PRICE_START:
            return {
                ...state,
                price: {
                    ...state.price,
                    loading: true,
                    onload: true,
                },
            };
        case actionTypes.FETCH_PRICE_SUCCESS:
            return {
                ...state,
                price: {
                    ...state.price,
                    prices: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case actionTypes.FETCH_PRICE_FAILURE:
            return {
                ...state,
                price: {
                    ...state.price,
                    prices: [],
                    loading: false,
                    error: action.payload,
                },
            };

        //PAYMENT
        case actionTypes.FETCH_PAYMENT_START:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    loading: true,
                    onload: true,
                },
            };
        case actionTypes.FETCH_PAYMENT_SUCCESS:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    payments: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case actionTypes.FETCH_PAYMENT_FAILURE:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    payments: [],
                    loading: false,
                    error: action.payload,
                },
            };

        //PROVINCE
        case actionTypes.FETCH_PROVINCE_START:
            return {
                ...state,
                province: {
                    ...state.province,
                    loading: true,
                    onload: true,
                },
            };
        case actionTypes.FETCH_PROVINCE_SUCCESS:
            return {
                ...state,
                province: {
                    ...state.province,
                    provinces: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case actionTypes.FETCH_PROVINCE_FAILURE:
            return {
                ...state,
                province: {
                    ...state.province,
                    provinces: [],
                    loading: false,
                    error: action.payload,
                },
            };
        default:
            return state;
    }
};

export default initAppDataReducer;
