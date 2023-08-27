import { getDoctorDataById } from '@/api/doctorAPI';
import LoadingSimple from '@/components/common/LoadingSimple/LoadingSimple';
import MatterWrap from '@/components/common/MatterWrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Markdown from './Markdown';
import { addDays, format } from 'date-fns';
import SelectDaySchedule from '@/components/common/SelectDaySchedule/SelectDaySchedule';
import { getScheduleByDateAId } from '@/api/scheduleAPI';
import RenderSchedule from '@/components/common/RenderSchedule/RenderSchedule';

function DetailDoctor() {
    const [doctorData, setDoctorData] = useState(null);
    const [loading, setLoading] = useState(false);
    const position = useSelector((state) => state.appData.position);
    const [arrTempSchedule, setArrTempSchedule] = useState([]);

    let { id } = useParams();
    const idNumber = parseInt(id);

    useEffect(() => {
        const fetch = async (idNumber) => {
            try {
                const params = { doctorId: idNumber };
                setLoading(true);
                let data = await getDoctorDataById(params);
                setLoading(false);

                if (data.errCode === 0) {
                    setDoctorData(data.data);
                } else {
                    data?.message && toast.error(data?.message);
                }
            } catch (error) {
                // toast.error('Error from fetch client');
                setLoading(false);
            }
        };
        fetch(idNumber);
    }, [idNumber]);
    // console.log(doctorData);
    /////
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [dateOptions, setDateOptions] = useState([]);
    const amountDate = 5;

    useEffect(() => {
        const today = new Date();
        const dates = [];

        for (let i = 0; i < amountDate; i++) {
            const currentDate = addDays(today, i);
            const formattedDate = format(currentDate, 'yyyy-MM-dd');
            dates.push(formattedDate);
        }

        setDateOptions(dates);
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    console.log(selectedDate);

    useEffect(() => {
        const fetchScheduleByDateAId = async () => {
            try {
                let params = { date: selectedDate, doctorId: idNumber };
                let res = await getScheduleByDateAId(params);

                if (res?.errCode?.status === 200) {
                    console.log(res.data);
                    setArrTempSchedule([...res.data]);
                }
            } catch (error) {}
        };
        fetchScheduleByDateAId();
    }, [selectedDate, idNumber]);

    return (
        <div className="">
            {loading && <LoadingSimple />}
            <MatterWrap propsClass="">
                <div className="">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6  py-2  text-gray-600">
                        <div className="md:col-span-1">
                            <div className="flex items-center justify-center">
                                <img
                                    className="w-full object-cover rounded-full p-2"
                                    alt="image_abc "
                                    src={doctorData?.doctor?.image}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-5 flex flex-col justify-center gap-1">
                            <p className="text-2xl font-semibold">
                                {(() => {
                                    const data = position.positions.find(
                                        (e) => e.id.toString() === doctorData?.doctor?.positionId,
                                    );
                                    return data?.valueVi;
                                })()}
                                {' || ' + doctorData?.doctor?.firstName + ' ' + doctorData?.doctor?.lastName}
                            </p>
                            <p className="">
                                <span className="font-medium">Address :</span> {doctorData?.doctor?.address}
                            </p>
                            <p className="">
                                <span className="font-medium">Email :</span> {doctorData?.doctor?.email}
                            </p>
                            <p className="">
                                <span className="font-medium ">Description :</span> {doctorData?.markdown?.description}
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6  py-2  text-gray-600">
                        <div className="md:col-span-3">
                            <SelectDaySchedule
                                selectedDate={selectedDate}
                                handleDateChange={handleDateChange}
                                dateOptions={dateOptions}
                            />
                            <div className="py-4">
                                {' '}
                                <RenderSchedule arr={arrTempSchedule} doctorId={idNumber} />
                            </div>
                        </div>
                        <div className="md:col-span-3"></div>
                    </div>
                </div>
            </MatterWrap>
            <MatterWrap propsClass="bg-gray-50 shadow">
                <Markdown contentHTML={doctorData?.markdown?.contentHTML} />
            </MatterWrap>
        </div>
    );
}

export default DetailDoctor;
