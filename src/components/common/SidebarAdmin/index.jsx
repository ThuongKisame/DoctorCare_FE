import { adminPath } from '@/routes';
import { useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { MdMenu } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

function SidebarAdmin() {
    const logo = process.env.PUBLIC_URL + '/logoDoctorCare.png';
    const [isNarrow, setIsNarrow] = useState(true);
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className={` duration-300   ${isNarrow ? ' w-auto' : ' w-72'}`}>
            <div className="flex h-sidebar flex-col justify-between border-e bg-slate-50">
                <div className={`${isNarrow ? 'px-2 py-0' : 'px-4 py-0'}`}>
                    <div className={`flex ${isNarrow ? 'justify-center' : 'justify-between'} items-center h-12  `}>
                        {!isNarrow && <img src={logo} className="h-12  object-contain" alt="logo" />}
                        <span className="text-gray-600 " onClick={() => setIsNarrow(!isNarrow)}>
                            {isNarrow ? (
                                <MdMenu
                                    size={26}
                                    className="bg-slate-100 p-1 rounded shadow hover:cursor-pointer hover:opacity-70  "
                                />
                            ) : (
                                <AiOutlineMenuFold
                                    size={26}
                                    className="bg-slate-100 p-1 rounded shadow hover:cursor-pointer hover:opacity-70  "
                                />
                            )}
                        </span>
                    </div>

                    <ul className="mt-6 space-y-1">
                        {adminPath.map((elm, index) => (
                            <li key={index}>
                                <Link
                                    to={elm.path}
                                    className={`flex gap-2 items-center rounded-lg bg-gray-100 ${
                                        isNarrow ? 'justify-center p-2' : 'px-4 py-2'
                                    }  text-sm font-medium text-gray-700 ${
                                        currentPath === elm.path
                                            ? 'bg-gray-100 text-primary  pointer-events-none'
                                            : 'bg-white '
                                    }`}
                                >
                                    <span className="">{elm.icon}</span>
                                    {!isNarrow && elm.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <Link href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <img
                            alt="Man"
                            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <div>
                            <p className="text-xs">
                                <strong className="block font-medium">Eric Frusciante</strong>

                                <span> eric@frusciante.com </span>
                            </p>
                        </div>
                    </Link>
                </div> */}
            </div>
        </div>
    );
}

export default SidebarAdmin;
