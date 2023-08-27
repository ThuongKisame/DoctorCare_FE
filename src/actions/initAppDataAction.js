import * as actionTypes from '@/actions/actionTypes';
import { getAllCode } from '@/api/allCodeAPI';

export const setLoading = (loading) => ({
    type: actionTypes.SET_LOADING,
    payload: loading,
});

export const fetchGenderStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_GENDER_START }); // Dispatch action báo hiệu đang thực hiện lấy dữ liệu
        try {
            let param = { type: 'GENDER' };
            const data = await getAllCode(param); // Gọi hàm fetchGender() để lấy dữ liệu từ database
            dispatch({
                type: actionTypes.FETCH_GENDER_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            dispatch({
                type: actionTypes.FETCH_GENDER_FAILURE,
                payload: error.message,
            });
        }
    };
};

export const fetchRoleStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ROLE_START }); // Dispatch action báo hiệu đang thực hiện lấy dữ liệu
        try {
            let param = { type: 'ROLE' };
            const data = await getAllCode(param); // Gọi hàm fetchROLE() để lấy dữ liệu từ database
            dispatch({
                type: actionTypes.FETCH_ROLE_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            dispatch({
                type: actionTypes.FETCH_ROLE_FAILURE,
                payload: error.message,
            });
        }
    };
};

export const fetchPositionStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_POSITION_START }); // Dispatch action báo hiệu đang thực hiện lấy dữ liệu
        try {
            let param = { type: 'POSITION' };
            const data = await getAllCode(param); // Gọi hàm fetchPOSITION() để lấy dữ liệu từ database
            dispatch({
                type: actionTypes.FETCH_POSITION_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            dispatch({
                type: actionTypes.FETCH_POSITION_FAILURE,
                payload: error.message,
            });
        }
    };
};

export const fetchTimeStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_TIME_START }); // Dispatch action báo hiệu đang thực hiện lấy dữ liệu
        try {
            let param = { type: 'TIME' };
            const data = await getAllCode(param); // Gọi hàm fetchPOSITION() để lấy dữ liệu từ database
            dispatch({
                type: actionTypes.FETCH_TIME_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            dispatch({
                type: actionTypes.FETCH_TIME_FAILURE,
                payload: error.message,
            });
        }
    };
};

export const fetchPriceStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_PRICE_START }); // Dispatch action báo hiệu đang thực hiện lấy dữ liệu
        try {
            let param = { type: 'PRICE' };
            const data = await getAllCode(param); // Gọi hàm fetchPOSITION() để lấy dữ liệu từ database
            dispatch({
                type: actionTypes.FETCH_PRICE_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            dispatch({
                type: actionTypes.FETCH_PRICE_FAILURE,
                payload: error.message,
            });
        }
    };
};

export const fetchPaymentStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_PAYMENT_START }); // Dispatch action báo hiệu đang thực hiện lấy dữ liệu
        try {
            let param = { type: 'PAYMENT' };
            const data = await getAllCode(param); // Gọi hàm fetchPOSITION() để lấy dữ liệu từ database
            dispatch({
                type: actionTypes.FETCH_PAYMENT_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            dispatch({
                type: actionTypes.FETCH_PAYMENT_FAILURE,
                payload: error.message,
            });
        }
    };
};

export const fetchProvinceStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_PROVINCE_START }); // Dispatch action báo hiệu đang thực hiện lấy dữ liệu
        try {
            let param = { type: 'PROVINCE' };
            const data = await getAllCode(param); // Gọi hàm fetchPOSITION() để lấy dữ liệu từ database
            dispatch({
                type: actionTypes.FETCH_PROVINCE_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            dispatch({
                type: actionTypes.FETCH_PROVINCE_FAILURE,
                payload: error.message,
            });
        }
    };
};
