import Axios from "axios";
import { LOG_IN, LOG_OUT, GET_ORDERS } from "../Action/actionTypes";

const url = "http://localhost:5000";

Axios.defaults.withCredentials = true;

export const logInUser = (values) => (dispatch) => {
  Axios.post(`${url}/user/login`, values, { withCredentials: true }).then(
    (res) => {
      if (res.data.message) {
        alert(res.data.message);
      } else {
        const userLog = res.data;
        dispatch({
          type: LOG_IN,
          payload: { userLog },
        });
        localStorage.setItem("userLog", JSON.stringify(userLog));
        return window.location.replace("/");
      }
    }
  );
};

export const logInGoogle = () => {
  return window.location.replace(`${url}/user/google`);
};

export const logOutUser = () => (dispatch) => {
  Axios.get(`${url}/user/logout`).then((res) => {
    const userLog = {};
    dispatch({
      type: LOG_OUT,
      payload: { userLog },
    });
    localStorage.clear();
    return window.location.replace(`/`);
  });
};

export const userProfile = () => (dispatch) => {
  Axios.get(`${url}/user/profile`).then((res) => {
    const userLog = res.data.user;
    dispatch({
      type: LOG_IN,
      payload: userLog,
    });
    localStorage.setItem("userLog", JSON.stringify(userLog));
  });
};

export const resetPassword = (data) => (dispatch) => {
  Axios.put(`${url}/user/reset/password`, data).then((res) => {
    if (!res.data.error) {
      alert("Tu contraseña a sido modificada con exito.");
      return window.location.replace("/user/login");
    }
    return alert(res.data.error);
  });
};

export const createUser = (data) => {
  Axios.post(`${url}/user/signup`, data).then(() => {
    return window.location.replace("/user/login");
  });
};

export const getOrdersUser = () => (dispatch) => {
  Axios.get(`${url}/user/orders`).then((res) => {
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  });
};
