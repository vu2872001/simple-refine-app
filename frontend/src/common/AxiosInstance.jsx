import axios from "axios";
import { store } from "redux/store";

const axiosInStance = axios.create({
    baseURL: "http://localhost:3000"
});

export const axiosWithToken = axios.create({
    baseURL: "http://localhost:3000"
});

export const get = async (url, options = {}, config = {}) => {
    const res = await axiosInStance.get(url, options, config);
    return res;
}

export const post = async (url, options = {}, config = {}) => {
    const res = await axiosInStance.post(url, options, config);
    return res;
}

export const put = async (url, options = {}, config = {}) => {
    const res = await axiosInStance.put(url, options, config);
    return res;
}

export const patch = async (url, options = {}, config = {}) => {
    const res = await axiosInStance.patch(url, options, config);
    return res;
}

export const del = async (url, options = {}, config = {}) => {
    const res = await axiosInStance.del(url, options, config);
    return res;
}

axiosWithToken.interceptors.request.use(request => {
    const token = store.getState().auth.login.currentUser.access;
    axiosWithToken.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
    console.log(request);
    return request
})

// axiosInStance.interceptors.response.use(
//   (response) => {
//       if (response.headers['Authorization'] && response.headers['Authorization'].includes('Bearer')) {
//           return response;
//       }
//       const customError = { 
//           message: 'You are not Authorized',
//           statusCode: 401,
//       };
//       return Promise.reject(customError);
//   },
//   (error) => {
//       const customError = {
//           ...error,
//           message: error.response?.data?.message,
//           statusCode: error.response?.status,
//       };

//       return Promise.reject(customError);
//   },
// );

export default axiosInStance;
