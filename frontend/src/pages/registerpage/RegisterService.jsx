import * as request from "common/AxiosInstance";
import {
  registerFailed,
  registerStart,
  registerSuccess,
} from "redux/authSlice";

export const registerUser = async (value, dispatch) => {
  try {
    dispatch(registerStart());
    const res = await request.post("/auth/register", {
      email: value.email,
      password: value.password,
    });
    dispatch(registerSuccess());
    return res.data;
  } catch (error) {
    console.log(error);
    dispatch(registerFailed());
  }
};
