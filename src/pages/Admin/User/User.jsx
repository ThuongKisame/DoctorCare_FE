import Breadcrumbs from '@/components/common/admin/Breadcrumbs';
import { paths } from '@/routes';
import UserTable from './UserTable';
import TableController from '@/components/common/admin/TableController';
import AddUserModel from './AddUserModel';
import { useCallback, useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination/Pagination';
import { toast } from 'react-toastify';
import { handleGetUser } from '@/api/userAPI';
import EditUserModel from './EditUserModel';

function User() {
    const [showAddUserModel, setShowAddUserModel] = useState(false);
    const [showEditUserModel, setShowEditUserModel] = useState(false);
    const [selectedUser, setSelectUser] = useState(null);

    const [userData, setUserData] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleShowEditUserModel = useCallback((user) => {
        setSelectUser(user);
        setShowEditUserModel(true);
    }, []);

    const handleCloseEditUserModel = useCallback(() => {
        setShowEditUserModel(false);
    }, []);

    const handleShowAddUserModel = useCallback(() => {
        setShowAddUserModel(true);
    }, []);

    const handleCloseAddUserModel = useCallback(() => {
        setShowAddUserModel(false);
    }, []);

    const perPage = 5; //the number of pages
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUser = useCallback(async () => {
        try {
            let params = { perPage: perPage, page: currentPage };
            setLoading(true);
            let data = await handleGetUser(params);
            setLoading(false);

            if (data.errCode === 0) {
                setUserData(data.users);
                setTotalPages(data.totalPages);
            } else {
                data?.message && toast.error(data?.message);
            }
        } catch (error) {
            // toast.error('Error from fetch client');
        }
    }, [currentPage]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div className="px-0 py-0">
            <Breadcrumbs path={paths.adminUser} />
            <div className="px-4 py-2">
                <TableController setShowAddUserModel={handleShowAddUserModel} />
            </div>
            <div className="px-4 py-2 overflow-x-auto">
                <UserTable
                    userData={userData}
                    loading={loading}
                    fetchUser={fetchUser}
                    handleShowEditUserModel={handleShowEditUserModel}
                />
            </div>
            <div className="px-4 py-2 flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    setTotalPages={setTotalPages}
                />
            </div>

            {/*model */}
            {showAddUserModel && (
                <AddUserModel handleCloseAddUserModel={handleCloseAddUserModel} fetchUser={fetchUser} />
            )}

            {showEditUserModel && (
                <EditUserModel
                    handleCloseEditUserModel={handleCloseEditUserModel}
                    selectedUser={selectedUser}
                    fetchUser={fetchUser}
                />
            )}
        </div>
    );
}

export default User;
