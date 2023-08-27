import ModelWrapper from '@/components/common/ModelWrapper';
import OutsideAlerter from '@/hook/useOutsideAlerter';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { getScheduleByDoctorId, updateSchedule } from '@/api/scheduleAPI';

function EditScheduleModel({ handleCloseModel, doctorId }) {
    const time = useSelector((state) => state.appData.time);
    const language = useSelector((state) => state.language.language);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [selectedDate, setSelectedDate] = useState(today);
    const [arrTempSchedule, setArrTempSchedule] = useState([]);

    const minDate = today;
    const maxDate = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from today
    maxDate.setHours(23, 59, 59, 999);

    // getScheduleByDoctorId
    useEffect(() => {
        const fetchDoctorById = async () => {
            try {
                let params = { doctorId: doctorId };
                let res = await getScheduleByDoctorId(params);
                if (res?.errCode?.status === 200) {
                    console.log(res.data);
                    setArrTempSchedule([...res.data]);
                }
            } catch (error) {}
        };
        fetchDoctorById();
    }, [doctorId]);

    const handleDateChange = (date) => {
        // kiểm tra xem thông tin lịch khám của ngày hiện tại có bị thay đổi không, nếu có thì thông báo bạn có muốn lưu thông tin thay đổi của ngày đó không
        setSelectedDate(date);
    };

    const handleSave = () => {
        const fetchUpdateSchedule = async () => {
            try {
                let params = { schedules: arrTempSchedule };
                const response = await updateSchedule(params);

                if (response?.errCode?.status === 200) {
                    toast.success('successfully');
                } else {
                    response?.message && toast.error(response?.message);
                }
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        };
        fetchUpdateSchedule();
    };

    const handleChangeScheduleTimes = (schedule) => {
        console.log(arrTempSchedule);

        let newSchedule = {
            doctorId: parseInt(doctorId),
            date: format(selectedDate, 'yyyy-MM-dd'),
            timeType: schedule.key,
            currentNumber: schedule.currentNumber,
        };
        // let findResult = arrTempSchedule.find((e) => e === newSchedule);
        const index = arrTempSchedule.findIndex(
            (e) =>
                e.timeType === newSchedule.timeType &&
                e.doctorId === newSchedule.doctorId &&
                e.date === newSchedule.date,
        );

        if (index !== -1) {
            let updatedArray = arrTempSchedule.filter((_, i) => i !== index); // Sử dụng filter để tạo mảng mới
            setArrTempSchedule(updatedArray);
        } else {
            let updatedArray = [...arrTempSchedule, newSchedule];
            setArrTempSchedule(updatedArray);
        }
    };

    return (
        <ModelWrapper>
            {/* {loading && <LoadingSimple />} */}
            <OutsideAlerter action={handleCloseModel}>
                <div className="bg-slate-50 rounded shadow w-[80vw] px-8 py-4 text-sm text-gray-600">
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center gap-1 font-medium">
                            <p>Date</p>
                            <DatePicker
                                className="border rounded py-1 px-2"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                minDate={minDate}
                                maxDate={maxDate}
                            />
                        </div>
                        <button
                            className="inline-block rounded border border-current px-2 py-1 text-xs font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-primary"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>

                    <div className="flex  flex-wrap items-center gap-4 mt-4">
                        {time.times.map((item, index) => {
                            const indexInTempSchedule = arrTempSchedule.findIndex(
                                (e) => e.timeType === item.key && e.date === format(selectedDate, 'yyyy-MM-dd'),
                            );

                            const bgColorClass = indexInTempSchedule !== -1 && 'bg-yellow-200';

                            const enableSchedule = arrTempSchedule.findIndex(
                                (e) =>
                                    e.timeType === item.key &&
                                    e.date === format(selectedDate, 'yyyy-MM-dd') &&
                                    e?.currentNumber > 0,
                            );

                            const active = enableSchedule !== -1 ? 'pointer-events-none' : 'hover:cursor-pointer';

                            return (
                                <div
                                    className={`px-4 py-2 rounded shadow text-center  ${bgColorClass}  ${active}`}
                                    key={index}
                                    onClick={() => handleChangeScheduleTimes(item)}
                                >
                                    {language === 'vi' ? item?.valueVi || '' : item?.valueEn || ''}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </OutsideAlerter>
        </ModelWrapper>
    );
}

export default EditScheduleModel;
