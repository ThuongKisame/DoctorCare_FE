//enf for quick export
import axiosClient from './axiosClient';

const handleLogin = (params) => {
    console.log(params, '///');
    const url = '/login';
    return axiosClient.post(url, { ...params });
};

const handleAddUser = (params) => {
    const url = '/user/createUser';
    return axiosClient.post(url, { ...params });
};

const handleGetUser = (params) => {
    const url = '/user/getUser';
    return axiosClient.post(url, { ...params });
};

const handleDeleteUser = (params) => {
    const url = '/user/deleteUser';
    return axiosClient.post(url, { ...params });
};

const handleEditUser = (params) => {
    const url = '/user/editUser';
    return axiosClient.post(url, { user: { ...params } });
};

export { handleLogin, handleAddUser, handleGetUser, handleDeleteUser, handleEditUser };
