import Breadcrumbs from '@/components/common/admin/Breadcrumbs';
import { paths } from '@/routes';
import { useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Import CSS cho Markdown Editor
import { useCallback, useEffect, useState } from 'react';
import { marked } from 'marked';
import { getDoctorById } from '@/api/doctorAPI';
import { toast } from 'react-toastify';
import LoadingSimple from '@/components/common/LoadingSimple/LoadingSimple';
import { useSelector } from 'react-redux';
import { getMarkdownByDoctorId, saveMarkdown } from '@/api/markdownAPI';
import EditScheduleModel from './EditScheduleModel';
// import { editDoctorSchema } from '@/masterData/formSchema';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

function DetailDoctor() {
    const options = {
        headerIds: false,
        mangle: false,
    };

    const [markdownValue, setMarkdownValue] = useState('');
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showEditScheduleModel, setShowEditScheduleModel] = useState(false);
    const [description, setDescription] = useState('');
    const price = useSelector((state) => state.appData.price);
    const payment = useSelector((state) => state.appData.payment);
    const province = useSelector((state) => state.appData.province);
    // const [doctorDetail, setDoctorDetail] = useState(null);
    const position = useSelector((state) => state.appData.position);
    //validate price
    const [selectedPriceId, setSelectedPriceId] = useState({ value: '', error: false });
    const handleChangePriceId = (id) => {
        if (id.length > 0) {
            setSelectedPriceId({ value: id, error: false });
        } else {
            setSelectedPriceId({ value: id, error: 'Please enter price' });
        }
    };
    const checkPriceId = () => {
        if (selectedPriceId.value.length > 0) {
            return true;
        } else {
            setSelectedPriceId({ ...selectedPriceId, error: 'Please enter price' });
            return false;
        }
    };

    //payment
    const [selectedPaymentId, setSelectedPaymentId] = useState({ value: '', error: false });
    const handleChangePaymentId = (id) => {
        if (id.length > 0) {
            setSelectedPaymentId({ value: id, error: false });
        } else {
            setSelectedPaymentId({ value: id, error: 'Please enter Payment' });
        }
    };
    const checkPaymentId = () => {
        if (selectedPaymentId.value.length > 0) {
            return true;
        } else {
            setSelectedPaymentId({ ...selectedPaymentId, error: 'Please enter Payment' });
            return false;
        }
    };
    //
    //provice
    const [selectedProvinceId, setSelectedProvinceId] = useState({ value: '', error: false });
    const handleChangeProvinceId = (id) => {
        if (id.length > 0) {
            setSelectedProvinceId({ value: id, error: false });
        } else {
            setSelectedProvinceId({ value: id, error: 'Please enter Province' });
        }
    };
    const checkProvinceId = () => {
        if (selectedProvinceId.value.length > 0) {
            return true;
        } else {
            setSelectedProvinceId({ ...selectedProvinceId, error: 'Please enter Province' });
            return false;
        }
    };
    //
    const handleMarkdownChange = (value) => {
        setMarkdownValue(value);
    };

    const handleCloseModel = () => {
        setShowEditScheduleModel(false);
    };

    let { id } = useParams();

    const fetchDoctorById = useCallback(async () => {
        try {
            const params = { doctorId: parseInt(id) };
            setLoading(true);
            let data = await getDoctorById(params);
            setLoading(false);

            if (data.errCode === 0) {
                setDoctor(data.data);
            } else {
                data?.message && toast.error(data?.message);
            }
        } catch (error) {
            // toast.error('Error from fetch client');
        }
    }, [id]);

    const fetchMarkdownByDoctorId = async (id) => {
        try {
            const params = { doctorId: parseInt(id) };
            console.log(params);
            setLoading(true);
            let data = await getMarkdownByDoctorId(params);
            setLoading(false);

            if (data.errCode === 0) {
                if (data.data) {
                    // setDoctorDetail(data.data);
                    setDescription(data.data?.description || '');
                    setMarkdownValue(data.data?.contentMarkdown || '');
                }
            }
        } catch (error) {
            // toast.error('Error from fetch client');
        }
    };

    useEffect(() => {
        let storedSelectedDoctor = localStorage.getItem('selectedDoctor');
        if (storedSelectedDoctor) {
            let selectedDoctorObject = JSON.parse(storedSelectedDoctor);
            setDoctor(selectedDoctorObject);
        } else {
            fetchDoctorById();
        }
        fetchMarkdownByDoctorId(id);
    }, [fetchDoctorById, id]);

    // const handleSaveMarkdown = useCallback(async () => {
    //     try {
    //         const params = {
    //             doctorId: parseInt(id),
    //             description: description,
    //             contentMarkdown: markdownValue,
    //             contentHTML: marked(markdownValue),
    //         };
    //         setLoading(true);
    //         let data = await saveMarkdown(params);
    //         setLoading(false);

    //         if (data.errCode === 0) {
    //             toast.success('Successful');
    //         } else {
    //             data?.message && toast.error(data?.message);
    //         }
    //     } catch (error) {
    //         // toast.error('Error from fetch client');
    //         setLoading(false);
    //     }
    // }, [description, markdownValue, id]);

    const handleSaveMarkdown = () => {};

    const showModelSchedule = () => {
        setShowEditScheduleModel(true);
    };

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     // setValue, // Add this line to set the default form values
    // } = useForm({
    //     resolver: yupResolver(editDoctorSchema),
    // });

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!checkPriceId()) return;
        if (!checkPaymentId()) return;
        if (!checkProvinceId()) return;

        console.log(selectedPriceId);
    };

    return (
        <div>
            {loading && <LoadingSimple />}
            <Breadcrumbs
                path={paths.adminDoctorDetail}
                arrButton={[
                    { name: 'Schedule', handleClick: showModelSchedule },
                    // { name: 'Save', handleClick: handleSaveMarkdown, type: 'submit' },
                ]}
            />
            <form onSubmit={formSubmitHandler} action="">
                <div className="h-contain overflow-y-auto">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 px-4 py-2 shadow-sm text-gray-600">
                        <div className="md:col-span-1">
                            <div className="flex items-center justify-center">
                                <img
                                    className="w-full object-cover rounded-full p-2"
                                    alt="image_abc "
                                    src={doctor?.image}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 flex flex-col justify-center gap-1">
                            <p className="">
                                <span className="font-medium">Full name :</span>{' '}
                                {(() => {
                                    const data = position.positions.find((e) => e.id.toString() === doctor?.positionId);
                                    return data?.valueVi;
                                })()}
                                {' - ' + doctor?.firstName + ' ' + doctor?.lastName}
                            </p>
                            <p className="">
                                <span className="font-medium">Address :</span> {doctor?.address}
                            </p>
                            <p className="">
                                <span className="font-medium">Email :</span> {doctor?.email}
                            </p>
                        </div>
                        <div className="md:col-span-3 p-2">
                            <textarea
                                className="border w-full h-full px-4 py-2 rounded focus:outline-none focus:ring-primary focus:ring active:text-primary"
                                placeholder="description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                rows={5} // Số hàng của textarea
                                cols={30} // Số cột của textarea
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 px-4 py-2 shadow-sm text-gray-600">
                        <div className="md:col-span-2">
                            <label htmlFor="priceId">price</label>
                            <select
                                name="priceId"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                value={selectedPriceId.value} // Sử dụng giá trị được chọn
                                onChange={(e) => handleChangePriceId(e.target.value)}
                            >
                                <option value="">Choose price</option>
                                {price.prices.map((elm, index) => (
                                    <option key={index} value={elm.id}>
                                        {elm.valueVi}
                                    </option>
                                ))}
                            </select>
                            {selectedPriceId.error && <p className="text-red-500">{selectedPriceId.error}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="paymentId">payment</label>
                            <select
                                name="paymentId"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                value={selectedPaymentId.value} // Sử dụng giá trị được chọn
                                onChange={(e) => handleChangePaymentId(e.target.value)}
                            >
                                <option value="">Choose payment</option>
                                {payment.payments.map((elm, index) => (
                                    <option key={index} value={elm.id}>
                                        {elm.valueVi}
                                    </option>
                                ))}
                            </select>
                            {selectedPaymentId.error && <p className="text-red-500">{selectedPaymentId.error}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="provinceId">province</label>
                            <select
                                name="provinceId"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                value={selectedProvinceId.value} // Sử dụng giá trị được chọn
                                onChange={(e) => handleChangeProvinceId(e.target.value)}
                            >
                                <option value="">Choose province</option>
                                {province.provinces.map((elm, index) => (
                                    <option key={index} value={elm.id}>
                                        {elm.valueVi}
                                    </option>
                                ))}
                            </select>
                            {selectedProvinceId.error && <p className="text-red-500">{selectedProvinceId.error}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 px-4 py-2 shadow-sm">
                        <p className="md:col-span-6">Blog</p>
                        <div className="md:col-span-3">
                            <SimpleMDE value={markdownValue} onChange={handleMarkdownChange} />
                        </div>
                        <div className="md:col-span-3">
                            <h2>Preview:</h2>
                            <div dangerouslySetInnerHTML={{ __html: marked(markdownValue, options) }} />
                        </div>
                    </div>
                    <div className="flex justify-end px-2 py-4">
                        <button
                            className="inline-block rounded border border-current px-2 py-1 text-xs font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-primary"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
            {showEditScheduleModel && <EditScheduleModel handleCloseModel={handleCloseModel} doctorId={id} />}
        </div>
    );
}

export default DetailDoctor;
