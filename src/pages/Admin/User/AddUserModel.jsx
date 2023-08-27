import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ModelWrapper from '@/components/common/ModelWrapper';
import OutsideAlerter from '@/hook/useOutsideAlerter';
import { createUserSchema } from '@/masterData/formSchema';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenderStart, fetchRoleStart, fetchPositionStart } from '@/actions/initAppDataAction';
import { handleAddUser } from '@/api/userAPI';
import { toast } from 'react-toastify';
import LoadingSimple from '@/components/common/LoadingSimple/LoadingSimple';
import { convertImageToBase64 } from '@/masterData/commonFunction';

function AddUserModel({ handleCloseAddUserModel, fetchUser }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const gender = useSelector((state) => state.appData.gender);

    const role = useSelector((state) => state.appData.role);

    const position = useSelector((state) => state.appData.position);

    useEffect(() => {
        if (!gender.onload) {
            dispatch(fetchGenderStart());
        }
    }, [gender.onload, dispatch]);

    useEffect(() => {
        if (!role.onload) {
            dispatch(fetchRoleStart());
        }
    }, [role.onload, dispatch]);

    useEffect(() => {
        if (!position.onload) {
            dispatch(fetchPositionStart());
        }
    }, [position.onload, dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createUserSchema),
    });

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const formSubmitHandler = (data) => {
        console.log(data);

        const fetchRegister = async () => {
            try {
                if (!selectedImage) {
                    toast.error('Please choose an image.');
                    return;
                }

                setLoading(true);
                const base64Image = await convertImageToBase64(selectedImage);
                const response = await handleAddUser({ ...data, image: base64Image });
                setLoading(false);

                if (response.errCode === 0) {
                    toast.success('Added user successfully');
                    handleCloseAddUserModel();
                    fetchUser();
                } else {
                    response?.message && toast.error(response?.message);
                }
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        };
        fetchRegister();
    };

    return (
        <ModelWrapper>
            {loading && <LoadingSimple />}
            <OutsideAlerter action={handleCloseAddUserModel}>
                <div className="bg-slate-50 rounded shadow w-[80vw] px-8 py-4">
                    <form onSubmit={handleSubmit(formSubmitHandler)} className="lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-primary text-2xl uppercase py-4">Create user</p>
                        </div>
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                            <div className="md:col-span-3">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    {...register('firstName')} // Use register function to bind the input to the form state
                                />
                                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    {...register('lastName')} // Use register function to bind the input to the form state
                                />
                                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                            </div>

                            <div className="md:col-span-4">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    placeholder="email@domain.com"
                                    {...register('email')} // Use register function to bind the input to the form state
                                />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    {...register('password')} // Use register function to bind the input to the form state
                                />
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>

                            <div className="md:col-span-6">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    {...register('address')} // Use register function to bind the input to the form state
                                />
                                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                            </div>

                            <div className="md:col-span-4 grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                                <div className="md:col-span-3">
                                    <label htmlFor="phoneNumber">Phone number</label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        {...register('phoneNumber')} // Use register function to bind the input to the form state
                                    />
                                    {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                                </div>

                                <div className="md:col-span-3">
                                    <label htmlFor="positionId">Position</label>
                                    <select
                                        name="positionId"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        {...register('positionId')}
                                    >
                                        <option value="">Choose position</option>
                                        {position.positions.map((elm, index) => (
                                            <option key={index} value={elm.id}>
                                                {elm.valueEn}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.positionId && <p className="text-red-500">{errors.positionId.message}</p>}
                                </div>

                                <div className="md:col-span-3">
                                    <label htmlFor="roleId">Role</label>
                                    <select
                                        name="roleId"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        {...register('roleId')}
                                    >
                                        <option value="">Choose role</option>
                                        {role.roles.map((elm, index) => (
                                            <option key={index} value={elm.id}>
                                                {elm.valueEn}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.roleId && <p className="text-red-500">{errors.roleId.message}</p>}
                                </div>

                                <div className="md:col-span-3">
                                    <label htmlFor="genderId">gender</label>
                                    <select
                                        {...register('genderId')}
                                        name="genderId"
                                        id="genderId"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    >
                                        <option value="">Choose gender </option>
                                        {gender.genders.map((elm, index) => (
                                            <option key={index} value={elm.id}>
                                                {elm.valueEn}
                                            </option>
                                        ))}
                                    </select>{' '}
                                    {errors.genderId && <p className="text-red-500">{errors.genderId.message}</p>}
                                </div>
                            </div>

                            <div className="md:col-span-2 relative ">
                                <input
                                    id="inputImage"
                                    className="py-0 h-0 absolute top-0 "
                                    type="file"
                                    name="chooseFile"
                                    onChange={(e) => handleFileChange(e)}
                                    accept="image/*" // Thêm accept vào đây để chỉ chấp nhận các file hình ảnh
                                    // required // Thêm required vào đây để đảm bảo người dùng phải chọn file trước khi gửi biểu mẫu
                                />
                                <label>Avatar</label>
                                <label
                                    htmlFor="inputImage"
                                    className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-gray-300 rounded-full p-1 opacity-70 z-50 text-gray-600 hover:cursor-pointer"
                                >
                                    <AiOutlineCloudUpload size={22} />
                                </label>

                                <div className="border-[3px] border-dashed  border-gray-400 rounded-xl h-32 w-full mt-1">
                                    {selectedImage ? (
                                        <img
                                            src={URL.createObjectURL(selectedImage)}
                                            alt="Selected"
                                            className="h-full w-full object-contain"
                                        />
                                    ) : null}
                                </div>
                            </div>

                            <div className="md:col-span-6 text-right">
                                <div className="inline-flex items-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </OutsideAlerter>
        </ModelWrapper>
    );
}

export default AddUserModel;
