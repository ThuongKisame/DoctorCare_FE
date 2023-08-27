import axiosClient from './axiosClient';

export const updateSchedule = (params) => {
    const url = '/schedule/postSchedule';
    return axiosClient.post(url, { ...params });
};

export const getScheduleByDoctorId = (params) => {
    const url = '/schedule/getScheduleByDoctorId';
    return axiosClient.post(url, { ...params });
};
export const getScheduleByDateAId = (params) => {
    const url = '/schedule/getScheduleByDateAId';
    return axiosClient.post(url, { ...params });
};
