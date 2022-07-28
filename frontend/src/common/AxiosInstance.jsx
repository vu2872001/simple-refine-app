const { default: axios } = require("axios");

const axiosInStance = axios.create({
    baseURL: "http://localhost:3000"
});

const axiosWithToken = axios.create();

export const get = async (url, options = {}, config = {}) => {
    const res = await axiosInStance.get(url, options, config);
    return res;
}

export const post = async (url, options = {}, config = {}) => {
    const res = await axiosInStance.post(url, options, config);
    return res;
}

axiosWithToken.interceptors.request.use(request =>{
    // console.log(request)
    return request
})
// axiosInStance.interceptors.request.use(function (req) {
//   const auth = localStorage.getItem("auth");
//   const token = JSON.parse(auth).token;

//   if (token) {
//       axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
//       return req;   
//   }
// });

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
