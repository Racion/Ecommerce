import Axios from "axios";
import {
  GET_CATEGORIES,
  POST_CATEGORY,
  DELETE_CATEGORIES,
} from "./actionTypes";

const url = "http://localhost:5000";

export const getCategories = () => (dispatch) => {
  Axios.get(`${url}/category/`)
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const postCategory = (values) => (dispatch) => {
  Axios.post(`${url}/category/`, { title: values.title })
    .then((res) => {
      dispatch({
        type: POST_CATEGORY,
        category: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteCategory = (id) => (dispatch) => {
  Axios.delete(`${url}/category/${id}`).then(() => {
    dispatch({
      type: DELETE_CATEGORIES,
    });
  });
};
