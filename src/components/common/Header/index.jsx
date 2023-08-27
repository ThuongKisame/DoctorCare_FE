import MatterWrap from '../MatterWrap';
import { navPaths, paths } from '@/routes';
import { changeLanguage } from '@/actions/changeLanguageActions';

import { LuMenu } from 'react-icons/lu';
import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdLanguage } from 'react-icons/md';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

function Header({ language, changeLanguage }) {
    const navRef = useRef(navPaths);
    const logo = process.env.PUBLIC_URL + '/logoDoctorCare.png';
    const location = useLocation();
    const currentPath = location.pathname;
    const user = useSelector((state) => state.user.user);

    useEffect(() => {}, [language]);
    // console.log('rerender');
    return (
        <header className="bg-secondary shadow fixed w-screen top-0 z-100">
            <MatterWrap>
                <div className="flex items-center justify-between h-header">
                    <div className="flex items-center ">
                        <LuMenu className="hover:cursor-pointer hover:opacity-70 shadow-sm w-8 h-8 p-1 duration-300 bg-slate-100" />
                        <img src={logo} className="h-16 w-32 object-contain" alt="logo" />
                    </div>

                    <div className="flex items-center gap-1 md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                {navRef.current.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <details className="group relative">
                                                <summary
                                                    className={`text-gray-500 flex  transition hover:text-gray-500/75 hover:bg-slate-100 rounded-md  px-2 py-1 ${
                                                        currentPath === item.path ? 'text-primary' : ''
                                                    }`}
                                                    style={{ listStyleType: 'none' }}
                                                >
                                                    <Link to={item.path} className="h-[23px] no-underline text-inherit">
                                                        <FormattedMessage id={item.name} defaultMessage="default" />
                                                    </Link>
                                                    {item?.subMenu && (
                                                        <MdKeyboardArrowRight
                                                            size={20}
                                                            className=" mt-[3px] transition duration-300 group-open:rotate-90"
                                                        />
                                                    )}
                                                </summary>
                                                {item?.subMenu && (
                                                    <ul className="absolute mt-3 space-y-1 px-0 left-0 w-48 bg-white rounded-sm shadow-lg">
                                                        {item.subMenu.map((subMenuItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <Link
                                                                    className={`block no-underline  px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                                                                        currentPath === subMenuItem.path
                                                                            ? 'text-primary'
                                                                            : ''
                                                                    }`}
                                                                    to={subMenuItem.path}
                                                                >
                                                                    <FormattedMessage
                                                                        id={subMenuItem.name}
                                                                        defaultMessage="default"
                                                                    />
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </details>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="flex items-center gap-[1px]">
                            {user ? (
                                `Hi!${user?.lastName}`
                            ) : (
                                <div className="flex items-center">
                                    <Link
                                        to={paths.login}
                                        className="text-gray-500 flex  transition hover:text-gray-500/75 text-sm rounded-md   py-1"
                                    >
                                        <FormattedMessage id="login" defaultMessage="default" />
                                    </Link>
                                    <span>/</span>
                                    <Link
                                        to={paths.login}
                                        className="text-gray-500 flex  transition hover:text-gray-500/75 text-sm rounded-md   py-1"
                                    >
                                        <FormattedMessage id="register" defaultMessage="default" />
                                    </Link>
                                </div>
                            )}
                            {/* <div className="sm:flex sm:gap-4">
                                <a
                                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                    href="/"
                                >
                                    Login
                                </a>

                                <div className="hidden sm:flex">
                                    <a
                                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                                        href="/"
                                    >
                                        Register
                                    </a>
                                </div>
                            </div> */}
                        </div>

                        <div className="flex items-center">
                            <MdLanguage className="text-primary w-6 h-6 " />
                            <select
                                className="rounded border-2 "
                                value={language}
                                onChange={(e) => changeLanguage(e.target.value)}
                            >
                                <option value="en">En</option>
                                <option value="vi">Vi</option>
                            </select>
                        </div>
                    </div>
                </div>
            </MatterWrap>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.language.language, // Access the combined language state from the intlReducer
    };
};

export default connect(mapStateToProps, { changeLanguage })(Header);
