import MatterWrap from '@/components/common/MatterWrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { paths } from '@/routes';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`bg-secondary w-9 h-9 p-2 -right-4 rounded shadow ${className}`}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`bg-secondary w-9 h-9 p-2 z-50 absolute -left-4 rounded shadow  ${className}`}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}

function SlideContent({ index, title, link, arr = [] }) {
    const position = useSelector((state) => state.appData.position);
    const language = useSelector((state) => state.language.language);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
        ],
    };
    return (
        <div className={`${index % 2 !== 0 && 'bg-secondary'} py-8`}>
            <MatterWrap>
                <div className="">
                    <div className="flex justify-between items-center p-4">
                        {title && (
                            <h1 className="font-semibold text-2xl">
                                <FormattedMessage id={title} defaultMessage="default" />
                            </h1>
                        )}
                        {link && (
                            <Link
                                className=" rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 shadow-sm"
                                to={link.path}
                            >
                                <FormattedMessage id={link.name} defaultMessage="default" />
                            </Link>
                        )}
                    </div>
                    <Slider {...settings}>
                        {arr.map((item, index) => (
                            // <div className="p-4" key={index}>
                            //     <Link to={item.path} className="rounded shadow-sm">
                            //         <img className="w-full object-cover " alt="image_abc " src={item.image} />
                            //         <div>{item.title}</div>
                            //     </Link>
                            // </div>
                            <div className="p-4" key={index}>
                                <Link to={paths.doctors + '/' + item.id} className="">
                                    <div className="border border-gray-200 rounded shadow-sm p-8 text-center">
                                        <div className="flex items-center justify-center">
                                            <img
                                                className="w-full object-cover rounded-full p-2"
                                                alt="image_abc "
                                                src={item.image}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                {(() => {
                                                    const data = position.positions.find(
                                                        (e) => e.id.toString() === item.positionId,
                                                    );
                                                    return language === 'vi'
                                                        ? data?.valueVi || ''
                                                        : data?.valueEn || '';
                                                })()}
                                            </div>
                                            <p>{item.firstName + ' ' + item.lastName}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </MatterWrap>
        </div>
    );
}

export default SlideContent;
