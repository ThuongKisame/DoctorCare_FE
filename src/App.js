import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '@/routes';
import { DefaultLayout } from '@/layouts';

import { OnlyHeader } from '@/layouts';
import NotFound from './components/common/NotFound';
import PrivateRouteWrapper from './components/common/PrivateRouteWrapper';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    fetchGenderStart,
    fetchPaymentStart,
    fetchPositionStart,
    fetchPriceStart,
    fetchProvinceStart,
    fetchRoleStart,
    fetchTimeStart,
} from './actions/initAppDataAction';
// import { createAxios } from './api/axiosClient';
// import { setAccessToken } from './actions/userActions';

function App() {
    const dispatch = useDispatch();

    const gender = useSelector((state) => state.appData.gender);

    const role = useSelector((state) => state.appData.role);

    const position = useSelector((state) => state.appData.position);

    const time = useSelector((state) => state.appData.time);

    const price = useSelector((state) => state.appData.price);

    const payment = useSelector((state) => state.appData.payment);

    const province = useSelector((state) => state.appData.province);

    // const accessToken = useSelector((state) => state.user.accessToken);
    // const refreshToken = useSelector((state) => state.user.refreshToken);

    // let user = { accessToken: accessToken, refreshToken: refreshToken };

    // createAxios(user, dispatch, setAccessToken);

    useEffect(() => {
        if (!gender?.onload) {
            dispatch(fetchGenderStart());
        }
    }, [gender?.onload, dispatch]);

    // useEffect(() => {
    //     if (!price?.onload) {
    //         dispatch(fetchPriceStart());
    //     }
    // }, [price?.onload, dispatch]);

    useEffect(() => {
        if (!role?.onload) {
            dispatch(fetchRoleStart());
        }
    }, [role?.onload, dispatch]);

    useEffect(() => {
        if (!time?.onload) {
            dispatch(fetchTimeStart());
        }
    }, [time?.onload, dispatch]);

    useEffect(() => {
        if (!price?.onload) {
            dispatch(fetchPriceStart());
        }
    }, [price?.onload, dispatch]);

    useEffect(() => {
        if (!position?.onload) {
            dispatch(fetchPositionStart());
        }
    }, [position?.onload, dispatch]);

    useEffect(() => {
        if (!payment?.onload) {
            dispatch(fetchPaymentStart());
        }
    }, [payment?.onload, dispatch]);

    useEffect(() => {
        if (!province?.onload) {
            dispatch(fetchProvinceStart());
        }
    }, [province?.onload, dispatch]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        {route.requestLogin ? (
                                            <PrivateRouteWrapper roleRequest={route.requestLogin}>
                                                <Page />
                                            </PrivateRouteWrapper>
                                        ) : (
                                            <Page />
                                        )}

                                        {/* <Page /> */}
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route
                        path="*"
                        element={
                            <OnlyHeader>
                                <NotFound />
                            </OnlyHeader>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
