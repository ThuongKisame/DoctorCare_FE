import { arrRole } from './constVariable';

export const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const navFromRole = (roleId) => {
    return arrRole.find((item) => item.value === roleId).defaultPath;
};
