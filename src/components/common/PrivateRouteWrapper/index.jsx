import { useNavigate } from 'react-router-dom';
import { paths } from '@/routes';
import { Fragment, useEffect, useCallback } from 'react';

import { useSelector } from 'react-redux';

function PrivateRouteWrapper({ children, roleRequest }) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const accessToken = useSelector((state) => state.user.accessToken);

    const checkRole = useCallback(
        (role) => {
            return role.toString() === user?.roleId;
        },
        [user],
    );

    useEffect(() => {
        // console.log(accessToken);
        if (!accessToken) {
            navigate(paths.login);
        } else {
            //check expired for accessToken

            // Check role
            if (!checkRole(roleRequest?.value)) {
                navigate(paths.login);
            }
        }
    }, [navigate, roleRequest, user, checkRole, accessToken]);

    return <Fragment>{children}</Fragment>;
}

export default PrivateRouteWrapper;
