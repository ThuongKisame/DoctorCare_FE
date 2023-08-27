import { getDoctor } from '@/api/doctorAPI';
import Pagination from '@/components/common/Pagination/Pagination';
import Breadcrumbs from '@/components/common/admin/Breadcrumbs';
import TableController from '@/components/common/admin/TableController';
import { paths } from '@/routes';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserTable from '../User/UserTable';

function Doctor() {
    const perPage = 5; //the number of pages
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [doctors, setDoctor] = useState([]);

    const fetchDoctor = useCallback(async () => {
        try {
            let params = { perPage: perPage, page: currentPage };
            setLoading(true);
            let data = await getDoctor(params);
            setLoading(false);

            if (data.errCode === 0) {
                setDoctor(data.data);
                setTotalPages(data.totalPages);
            } else {
                data?.message && toast.error(data?.message);
            }
        } catch (error) {
            // toast.error('Error from fetch client');
        }
    }, [currentPage]);

    useEffect(() => {
        fetchDoctor();
    }, [fetchDoctor]);

    console.log(doctors);
    return (
        <div>
            <Breadcrumbs path={paths.adminDoctor} />
            <div className="px-4 py-2">
                <TableController />
            </div>
            <div className="px-4 py-2 overflow-x-auto">
                <UserTable userData={doctors} loading={loading} fetchUser={fetchDoctor} type="DOCTOR" />
            </div>

            <div className="px-4 py-2 flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    setTotalPages={setTotalPages}
                />
            </div>
        </div>
    );
}

export default Doctor;
