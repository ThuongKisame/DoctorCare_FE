import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(3, 'Mật khẩu phải chứa ít nhất 3 ký tự'),
});

export const registerSchema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên'),
    phoneNumber: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.'),
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự'),
    passwordConfirm: yup
        .string()
        .required('Vui lòng xác thực mật khẩu')
        .oneOf([yup.ref('password')], 'Mật khẩu xác thực không khớp'),
    checkbox: yup.boolean().oneOf([true], 'check box mess'),
});

export const createUserSchema = yup.object().shape({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name'),
    address: yup.string().required('Please enter your address'),
    email: yup.string().required('Please enter your email').email('Please enter correct email format'),
    password: yup.string().required('Please enter your password').min(3, 'Password must contain least 3 character'),
    phoneNumber: yup
        .string()
        .required('Please enter your phone number ')
        .matches(/^[0-9]{10}$/, 'Invalid phone number . Please enter 10 digits.'),
    roleId: yup.string().required('Please choose a role').required('Role is required'),
    positionId: yup.string().required('Please choose a position').required('position is required'),
    genderId: yup.string('Gender should be a string').required('Gender is required'),
});

export const updateUserSchema = yup.object().shape({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name'),
    address: yup.string().required('Please enter your address'),
    email: yup.string().required('Please enter your email').email('Please enter correct email format'),
    phoneNumber: yup
        .string()
        .required('Please enter your phone number ')
        .matches(/^[0-9]{10}$/, 'Invalid phone number . Please enter 10 digits.'),
    roleId: yup.string().required('Please choose a role').required('Role is required'),
    positionId: yup.string().required('Please choose a position').required('position is required'),
    genderId: yup.string('Gender should be a string').required('Gender is required'),
});

export const editDoctorSchema = yup.object().shape({
    description: yup.string().required('Please enter your description'),
    priceId: yup.string().required('Price is required'),
    paymentId: yup.string().required('Payment is required'),
    provinceId: yup.string().required('Province is required'),
    nameClinic: yup.string().required('Name of clinic is required'),
    addressClinic: yup.string().required('Address of clinic is required'),
    note: yup.string(),
    count: yup.number().integer(),
});
