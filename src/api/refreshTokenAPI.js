import axiosClient from './axiosClient';

export const getNewToken = (params) => {
    const url = '/refreshToken/refreshTokenRequest';
    return axiosClient.post(url, { ...params });
};
export const testAPI = (params) => {
    const url = '/test';
    return axiosClient.post(url, { ...params });
};
