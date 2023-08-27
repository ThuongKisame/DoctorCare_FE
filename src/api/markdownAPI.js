import axiosClient from './axiosClient';

export const getMarkdownByDoctorId = (params) => {
    const url = '/markdown/getMarkdown';
    return axiosClient.post(url, { ...params });
};

export const saveMarkdown = (params) => {
    const url = '/markdown/createMarkdown';
    return axiosClient.post(url, { ...params });
};
