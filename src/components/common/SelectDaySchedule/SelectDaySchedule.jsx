import { format, getDay } from 'date-fns';
import { useSelector } from 'react-redux';

function SelectDaySchedule({ selectedDate, handleDateChange, dateOptions }) {
    const language = useSelector((state) => state.language.language);
    console.log(language);

    const enDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const viDayOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    let dayOfWeekLanguage = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (language === 'vi') {
        dayOfWeekLanguage = viDayOfWeek;
    } else {
        dayOfWeekLanguage = enDayOfWeek;
    }
    const formatDateLabel = (dateString) => {
        const date = new Date(dateString);
        const dayOfWeek = [...dayOfWeekLanguage][getDay(date)];
        const formattedDate = format(date, 'dd/MM');
        return `${dayOfWeek} - ${formattedDate}`;
    };
    return (
        <div>
            <select
                className="font-bold text-primary py-1 px-2 border-b-2 border-primary hover:cursor-pointer "
                value={selectedDate}
                onChange={(e) => handleDateChange(e)}
            >
                {dateOptions.map((date, index) => (
                    <option key={index} value={date}>
                        {formatDateLabel(date)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectDaySchedule;
