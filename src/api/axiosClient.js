// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { getNewToken } from './refreshTokenAPI';
import { setAccessToken } from '@/actions/userActions';
import { store } from '@/store';

// Please have a look at here `https://github.com/axios/axios#request-

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
    maxContentLength: 10000000, // Tăng giới hạn kích thước content lên 10MB
    maxBodyLength: 10000000, // Tăng giới hạn kích thước body lên 10MB
});

//--> app.js
// axiosClient.interceptors.request.use(async (config) => {
//     //set token to header

//     const getTokensFromLocalStorage = () => {
//         const persistState = localStorage.getItem('persist:root'); // Lấy chuỗi JSON lưu trữ trong localStorage
//         if (persistState) {
//             const parsedState = JSON.parse(persistState); // Chuyển chuỗi JSON thành đối tượng JavaScript
//             const userState = JSON.parse(parsedState.user); // Lấy phần tử 'user' từ đối tượng parsedState
//             const { refreshToken, accessToken } = userState; // Lấy refreshToken và accessToken từ phần tử 'user'

//             return { refreshToken, accessToken };
//         }

//         return { refreshToken: null, accessToken: null };
//     };
//     let data = getTokensFromLocalStorage();

//     config.headers['token'] = `Bearer ${data.accessToken}`;

//     console.log(data);

//     try {
//         if (data.accessToken && data.refreshToken) {
//             //check expires
//             let date = new Date();
//             const decodeJwt = jwtDecode(data.accessToken);
//             console.log(decodeJwt);
//             await new Promise((resolve) => setTimeout(resolve, 10000));

//             if (decodeJwt.exp < date.getTime() / 1000) {
//                 console.log('your token is expire time ');
//                 const fetchNewToken = async () => {
//                     try {
//                         const response = await getNewToken(data.refreshToken);
//                         if (response?.errCode?.status === 200) {
//                             console.log(response);
//                             // dispatch(setAccessToken(response?.access_token));
//                             config.headers['token'] = `Bearer ${response?.access_token}`;
//                         } else {
//                             toast.error('your token is expire time and can not refresh');
//                         }
//                     } catch (error) {
//                         console.log(error);
//                     }
//                 };

//                 fetchNewToken();
//             }
//         }
//     } catch (error) {}
//     return config;
// });

// axiosClient.interceptors.request.use(
//     async (config) => {
//         const { accessToken, refreshToken } = store.getState().user;

//         if (accessToken) {
//             config.headers['Authorization'] = `Bearer ${accessToken}`;
//         }

//         try {
//             if (accessToken && refreshToken) {
//                 let date = new Date();
//                 const decodeJwt = jwtDecode(accessToken);
//                 await new Promise((resolve) => setTimeout(resolve, 10000));

//                 if (decodeJwt.exp < date.getTime() / 1000) {
//                     console.log(accessToken, refreshToken);
//                     const response = await getNewToken(refreshToken);
//                     console.log(response);

//                     console.log('Your token is expired.');
//                     // Call your function to refresh token here
//                     // try {
//                     //     const response = await getNewToken(refreshToken);
//                     //     if (response?.errCode?.status === 200) {
//                     //         store.dispatch(setAccessToken(response?.access_token));
//                     //         config.headers['Authorization'] = `Bearer ${response?.access_token}`;
//                     //     } else {
//                     //         toast.error('Your token has expired and could not be refreshed.');
//                     //     }
//                     // } catch (error) {
//                     //     console.log(error);
//                     // }
//                 }
//             }
//         } catch (error) {}
//         return config;
//     },
//     (error) => {
//         throw error;
//     },
// );

axiosClient.interceptors.request.use(
    async (config) => {
        const { accessToken, refreshToken } = store.getState().user;

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        try {
            if (accessToken && refreshToken && accessToken !== 1) {
                let date = new Date();
                const decodeJwt = jwtDecode(accessToken);

                if (decodeJwt.exp < date.getTime() / 1000) {
                    console.log('Your token is expired.');
                    store.dispatch(setAccessToken(1));

                    // Call your function to refresh token here
                    try {
                        let params = { refreshToken: refreshToken };
                        const response = await getNewToken(params);
                        if (response?.errCode?.status === 200) {
                            store.dispatch(setAccessToken(response?.access_token));
                            config.headers['Authorization'] = `Bearer ${response?.access_token}`;
                        } else {
                            toast.error('Your token has expired and could not be refreshed.');
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } catch (error) {}
        return config;
    },
    (error) => {
        throw error;
    },
);

export const createAxios = (user, dispatch, setAccessToken) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                console.log('your token is expire');
                const response = await getNewToken(user?.refreshToken);
                if (response?.errCode?.status === 200) {
                    console.log(response);
                    dispatch(setAccessToken(response?.access_token));
                    config.headers['token'] = `Bearer ${response?.access_token}`;
                    console.log('your token has been renew');
                } else {
                    toast.error('your token is expire time and can not refresh');
                }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

export default axiosClient;
