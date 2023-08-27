// Layouts
import { OnlyHeader, AdminLayout } from '@/layouts';

// Pages
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Doctors from '@/pages/Doctors';
import Login from '@/pages/Login';
import DetailDoctor from '@/pages/DetailDoctor/DetailDoctor';

import AdminUser from '@/pages/Admin/User/User';
import AdminDoctor from '@/pages/Admin/Doctor/Doctor';
import AdminDetailDoctor from '@/pages/Admin/DetailDoctor/DetailDoctor';

import { AiOutlineHome } from 'react-icons/ai';
import { RiServiceLine } from 'react-icons/ri';
import { ROLE } from '@/masterData/constVariable';
import { MdGroups2 } from 'react-icons/md';
import { GiPlagueDoctorProfile } from 'react-icons/gi';

const paths = {
    home: '/',
    doctors: '/doctors',
    detailDoctor: '/doctors/:id',

    services: '/services',
    login: '/login',
    //admin
    adminUser: '/admin',
    adminDoctor: '/admin/doctors',
    adminDoctorDetail: '/admin/doctors/:id',
};

//nav path
const navPaths = [
    { name: 'home', path: paths.home, icon: <AiOutlineHome /> },
    {
        name: 'services',
        path: paths.services,
        icon: <RiServiceLine />,
        // subMenu: [{ name: 'Đặt lịch', path: paths.services, icon: <RiServiceLine /> }],
    },
    { name: 'doctors', path: paths.doctors, icon: <GiPlagueDoctorProfile /> },
];

//admin path
const adminPath = [
    { name: 'Users', path: paths.adminUser, icon: <MdGroups2 size={20} /> },
    { name: 'Doctors', path: paths.adminDoctor, icon: <GiPlagueDoctorProfile size={20} /> },
];
// Public routes
const publicRoutes = [
    { path: paths.home, component: Home },
    { path: paths.doctors, component: Doctors },
    { path: paths.detailDoctor, component: DetailDoctor },
    { path: paths.services, component: Services, layout: OnlyHeader },
    { path: paths.login, component: Login, layout: OnlyHeader },

    { path: paths.adminUser, component: AdminUser, layout: AdminLayout, requestLogin: ROLE.R1 },
    { path: paths.adminDoctor, component: AdminDoctor, layout: AdminLayout, requestLogin: ROLE.R1 },
    { path: paths.adminDoctorDetail, component: AdminDetailDoctor, layout: AdminLayout, requestLogin: ROLE.R1 },
];

export { publicRoutes, paths, navPaths, adminPath };
