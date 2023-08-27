import * as actionTypes from '@/actions/actionTypes';
// import { ACCESS_TOKEN, USER } from '@/masterData/constVariable';

export const setUser = (user) => ({
    type: actionTypes.SET_USER,
    payload: user,
});

export const setAccessToken = (accessToken) => ({
    type: actionTypes.SET_ACCESS_TOKEN,
    payload: accessToken,
});

export const setRefreshToken = (refreshToken) => ({
    type: actionTypes.SET_REFRESH_TOKEN,
    payload: refreshToken,
});

// // Middleware để lưu access token vào local storage
// export const saveAccessTokenToLocalStorage = (store) => (next) => (action) => {
//     if (action.type === actionTypes.SET_ACCESS_TOKEN) {
//         const accessToken = action.payload;
//         localStorage.setItem(ACCESS_TOKEN, accessToken);
//     }
//     return next(action);
// };

// export const localStorageMiddleware = (store) => (next) => (action) => {
//     if (action.type === actionTypes.SET_USER) {
//         localStorage.setItem(USER, JSON.stringify(action.payload));
//     }
//     return next(action);
// };
