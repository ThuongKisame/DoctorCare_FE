import { useEffect, useState } from 'react';
import Banner from './Banner';
import SlideContent from './SlideContent';
import { getDoctor } from '@/api/doctorAPI';
import { paths } from '@/routes';

function Home() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                let data = await getDoctor();
                if (data.errCode === 0) {
                    setDoctors(data.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchDoctor();
    }, []);

    console.log(doctors);

    return (
        <div>
            <Banner />
            <SlideContent
                index={0}
                title={'popular_specialty'}
                link={{ path: paths.doctors, name: 'see_more' }}
                arr={doctors}
            />
            {/* <SlideContent
                index={1}
                title={'featured_doctor'}
                link={{ path: paths.doctors, name: 'view_detail' }}
                arr={doctors}
            /> */}
        </div>
    );
}

export default Home;
