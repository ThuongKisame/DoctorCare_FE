import axiosClient from './axiosClient';

const getAllCode = (params) => {
    console.log(params);
    const url = '/allCode';
    return axiosClient.post(url, { ...params });
};

export { getAllCode };
