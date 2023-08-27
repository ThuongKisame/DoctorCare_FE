import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

function RenderSchedule({ arr = [], doctorId }) {
    const language = useSelector((state) => state.language.language);
    const time = useSelector((state) => state.appData.time);

    // console.log(arr);
    // console.log(doctorId);
    const handleChangeScheduleTimes = (item) => {
        console.log(item);
    };
    return (
        <div className="space-y-3">
            <div className="flex gap-2 items-center font-bold">
                <BsFillCalendarWeekFill /> Đặt lịch
            </div>
            <div className="flex gap-4">
                {arr.map((item, index) => {
                    let getAttribute = time.times.find((e) => e.key === item.timeType);

                    return (
                        item?.currentNumber !== item?.maxNumber && (
                            <div
                                className={`px-4 py-2 font-medium rounded shadow text-center bg-yellow-300 hover:cursor-pointer hover:scale-105 hover:shadow-lg duration-200`}
                                key={index}
                                onClick={() => handleChangeScheduleTimes(item)}
                            >
                                {language === 'vi' ? getAttribute?.valueVi || '' : getAttribute?.valueEn || ''}
                            </div>
                        )
                    );
                })}
            </div>
            {arr.length === 0 ? (
                <div className="font-bold text-gray-600">Không có lịch khám vào ngày này!</div>
            ) : (
                <div className="font-bold text-gray-600">Click để đặt lịch miễn phí</div>
            )}
        </div>
    );
}

export default RenderSchedule;
