import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner1 from '@/assets/img/banner1.jpeg';
import banner2 from '@/assets/img/banner2.jpeg';
import banner3 from '@/assets/img/banner3.jpeg';

import { BsBuildingFillAdd } from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';
import { GiVibratingSmartphone } from 'react-icons/gi';

function Banner() {
    return (
        <div className=" w-full h-banner relative ">
            <div className="absolute w-full h-banner flex z-50">
                <div className="w-full text-center text-primary font-normal flex flex-col justify-center items-center gap-2 px-10">
                    <div className="text-4xl text-shadow uppercase">
                        <FormattedMessage id="banner_title1" defaultMessage="default" />
                    </div>
                    <div className="text-3xl text-shadow ">
                        <FormattedMessage id="banner_title2" defaultMessage="default" />{' '}
                    </div>

                    <div className="relative w-64 sm:w-[500px] ">
                        <label htmlFor="Search" className="sr-only">
                            {' '}
                            Search{' '}
                        </label>

                        <input
                            type="text"
                            id="Search"
                            placeholder="Search ..."
                            className="w-full rounded-3xl border-gray-200 py-4 pe-10  sm:text-sm px-4 shadow"
                        />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center ">
                            <button type="button" className="text-gray-600  hover:text-primary">
                                <span className="sr-only">Search</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </button>
                        </span>
                    </div>
                    <div className="w-full px-4 flex justify-around flex-wrap mt-12 sm:mt-40">
                        <div className="flex flex-col items-center hover:scale-110 duration-200 hover:cursor-pointer hover:opacity-70 text-black hover:text-primary">
                            <div className="w-14 h-14 bg-white p-2 rounded-full flex items-center shadow justify-center  text-primary  ">
                                <BsBuildingFillAdd className="w-8 h-8 " />
                            </div>
                            <p className="text-center max-w-[100px]">
                                <FormattedMessage id="specialist_examination" defaultMessage="default" />
                            </p>
                        </div>
                        <div className="flex flex-col items-center hover:scale-110 duration-200 hover:cursor-pointer hover:opacity-70 text-black hover:text-primary">
                            <div className="w-14 h-14 bg-white p-2 rounded-full flex items-center shadow justify-center  text-primary  ">
                                <GiVibratingSmartphone className="w-8 h-8 " />
                            </div>
                            <p className="text-center max-w-[100px]">
                                <FormattedMessage id="remote_examination" defaultMessage="default" />
                            </p>
                        </div>
                        <div className="flex flex-col items-center hover:scale-110 duration-200 hover:cursor-pointer hover:opacity-70 text-black hover:text-primary">
                            <div className="w-14 h-14 bg-white p-2 rounded-full flex items-center shadow justify-center  text-primary  ">
                                <BsBuildingFillAdd className="w-8 h-8 " />
                            </div>
                            <p className="text-center max-w-[100px]">
                                <FormattedMessage id="specialist_examination" defaultMessage="default" />
                            </p>
                        </div>
                        <div className="flex flex-col items-center hover:scale-110 duration-200 hover:cursor-pointer hover:opacity-70 text-black hover:text-primary">
                            <div className="w-14 h-14 bg-white p-2 rounded-full flex items-center shadow justify-center  text-primary  ">
                                <BsBuildingFillAdd className="w-8 h-8 " />
                            </div>
                            <p className="text-center max-w-[100px]">
                                <FormattedMessage id="specialist_examination" defaultMessage="default" />
                            </p>
                        </div>
                        <div className="flex flex-col items-center hover:scale-110 duration-200 hover:cursor-pointer hover:opacity-70 text-black hover:text-primary">
                            <div className="w-14 h-14 bg-white p-2 rounded-full flex items-center shadow justify-center  text-primary  ">
                                <BsBuildingFillAdd className="w-8 h-8 " />
                            </div>
                            <p className="text-center max-w-[100px]">
                                <FormattedMessage id="specialist_examination" defaultMessage="default" />
                            </p>
                        </div>
                        <div className="flex flex-col items-center hover:scale-110 duration-200 hover:cursor-pointer hover:opacity-70 text-black hover:text-primary">
                            <div className="w-14 h-14 bg-white p-2 rounded-full flex items-center shadow justify-center  text-primary  ">
                                <BsBuildingFillAdd className="w-8 h-8 " />
                            </div>
                            <p className="text-center max-w-[100px]">
                                <FormattedMessage id="specialist_examination" defaultMessage="default" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Carousel showArrows autoPlay showThumbs={false} infiniteLoop swipeable emulateTouch interval={4000}>
                <div>
                    <img className="w-full h-banner object-cover" src={banner1} alt="Banner 1" />
                </div>
                <div>
                    <img className="w-full h-banner object-cover" src={banner2} alt="Banner 2" />
                </div>
                <div>
                    <img className="w-full h-banner object-cover" src={banner3} alt="Banner 3" />
                </div>
            </Carousel>
            <div className="absolute h-72 bg-gradient-to-t from-slate-50 to-transparent w-full bottom-0 left-0 "></div>
        </div>
    );
}

export default Banner;
