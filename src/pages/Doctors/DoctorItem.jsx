import { paths } from '@/routes';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DoctorItem({ doctor }) {
    const position = useSelector((state) => state.appData.position);
    const language = useSelector((state) => state.language.language);
    return (
        <li>
            <Link to={paths.doctors + '/' + doctor.id} className="">
                <div className="border border-gray-200 rounded shadow-sm p-8 text-center">
                    <div className="flex items-center justify-center">
                        <img className="w-full object-cover rounded-full p-2" alt="image_abc " src={doctor.image} />
                    </div>
                    <div>
                        <div>
                            {(() => {
                                const data = position.positions.find((e) => e.id.toString() === doctor.positionId);
                                return language === 'vi' ? data.valueVi || '' : data.valueEn || '';
                            })()}
                        </div>
                        <p>{doctor.firstName + ' ' + doctor.lastName}</p>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default DoctorItem;
