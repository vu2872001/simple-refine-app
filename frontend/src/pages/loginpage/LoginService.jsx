import * as request from 'common/AxiosInstance';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
} from 'redux/authSlice';

export const loginAuth = async (value, dispatch) => {
  try {
    dispatch(loginStart());
    const res = await request.post('/auth/login', {
      email: value.email,
      password: value.password,
    });
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (error) {
    console.log(error.message);
    dispatch(loginFailed());
  }
};

export const logoutAuth = async (token, dispatch) => {
  try {
    dispatch(logOutStart());
    const config = {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await request.post('/auth/logout', '', config);
    dispatch(logOutSuccess());
    return res;
  } catch (error) {
    console.log(error);
    dispatch(logOutFailed());
  }
};
