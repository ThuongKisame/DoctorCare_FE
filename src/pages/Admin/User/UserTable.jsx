import { useSelector } from 'react-redux';

import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { memo } from 'react';
import LoadingSimple from '@/components/common/LoadingSimple/LoadingSimple';
import { toast } from 'react-toastify';
import { handleDeleteUser } from '@/api/userAPI';
import { useNavigate } from 'react-router-dom';

function UserTable({ userData, loading, fetchUser, handleShowEditUserModel = false, type = false }) {
    const navigate = useNavigate();
    const gender = useSelector((state) => state.appData.gender);

    const role = useSelector((state) => state.appData.role);

    const position = useSelector((state) => state.appData.position);

    const handleOnclickDeleteUser = (userId) => {
        const fetchDelete = async () => {
            try {
                let params = { id: userId };

                const response = await handleDeleteUser(params);

                if (response.errCode === 0) {
                    toast.success('Delete user successfully');
                    fetchUser();
                } else {
                    response?.message && toast.error(response?.message);
                }
            } catch (error) {
                toast.error('Error while deleting user');
            }
        };
        fetchDelete();
    };

    const handleSelectRow = (data) => {
        if (type) {
            switch (type) {
                case 'DOCTOR':
                    //save doctor to localStorage
                    localStorage.setItem('selectedDoctor', JSON.stringify(data));
                    const url = `/admin/doctors/${data.id}`;
                    navigate(url);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            {loading && <LoadingSimple />}
            <table className=" shadow-sm w-full ">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Address</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Phone number</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Gender</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Role</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Position</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Edit</div>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100 ">
                    {userData.map((item, index) => {
                        return (
                            <tr
                                key={index}
                                className={`${type && 'hover:cursor-pointer hover:bg-slate-50'}`}
                                onClick={() => handleSelectRow(item)}
                            >
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                            <img
                                                className="rounded-full w-10 h-10 object-cover"
                                                src={item.image}
                                                alt={item?.name || ''}
                                            />
                                        </div>
                                        <div className=" text-gray-800">{item?.firstName + ' ' + item?.lastName}</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left">{item?.email}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className=" text-left">{item?.address}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-center  text-gray-800">{item?.phoneNumber}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-center  text-gray-800">
                                        {role.roles.find((e) => e.id.toString() === item.roleId)?.valueEn}
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-center  text-gray-800">
                                        {gender.genders.find((e) => e.id.toString() === item.genderId)?.valueEn}
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-center  text-gray-800">
                                        {position.positions.find((e) => e.id.toString() === item.positionId)?.valueEn}
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-center  flex gap-1 justify-center items-center">
                                        {handleShowEditUserModel && (
                                            <span
                                                className="text-primary hover:cursor-pointer hover:scale-110 duration-300"
                                                onClick={() => handleShowEditUserModel(item)}
                                            >
                                                <FaEdit size={20} />
                                            </span>
                                        )}
                                        <span
                                            className="text-red-600 hover:cursor-pointer hover:scale-110 duration-300"
                                            onClick={() => handleOnclickDeleteUser(item?.id)}
                                        >
                                            <AiFillDelete size={20} />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default memo(UserTable);
