import axios from "axios";
import axiosInStance, * as request from "common/AxiosInstance";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
} from "redux/usersSlice";
import { store } from "../../redux/store";
export const updateUser = async (userid, value, dispatch) => {
  try {
    dispatch(updateUserStart());
    const token = store.getState().auth.login.currentUser.access;
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await request.put(
      `/user/update/${userid}`,
      {
        email: value.email,
        username: value.username,
        name: value.name,
        age: parseInt(value.age),
      },
      config
    );
    dispatch(updateUserSuccess());
    return res;
  } catch (error) {
    console.log(error);
    dispatch(updateUserFailed());
  }
};
export const deleteUser = async (userId, dispatch) => {
  try {
    dispatch(deleteUserStart());
    const token = store.getState().auth.login.currentUser.access;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axiosInStance.delete(`/user/delete/${userId}`, config);
    dispatch(deleteUserSuccess());
    return res;
  } catch (error) {
    console.log(error);
    dispatch(deleteUserFailed());
  }
};
