import axiosClient from './axiosClient';

export const getDoctor = (params) => {
    const url = '/doctor/getLimitDoctor';
    return axiosClient.post(url, { ...params });
};

export const getDoctorById = (params) => {
    console.log('get doctor by id:', params);
    const url = '/doctor/getDoctorById';
    return axiosClient.post(url, { ...params });
};

export const getDoctorDataById = (params) => {
    console.log('get doctor by id:', params);
    const url = '/doctor/getDoctorDataById';
    return axiosClient.post(url, { ...params });
};
