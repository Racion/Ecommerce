import Axios from "axios";
import {
  GET_PRODUCTS,
  POST_PRODUCTS,
  DELETE_PRODUCT,
  GET_PRODUCT,
  PUT_PRODUCT,
} from "./actionTypes";

const url = "http://localhost:5000";

export const getProducts = () => (dispatch) => {
  Axios.get(`${url}/products/`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const postProducts = (product) => (dispatch) => {
  Axios.post(`${url}/products/`, product)
    .then((res) => {
      dispatch({
        type: POST_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (id) => (dispatch) => {
  Axios.delete(`${url}/products/${id}`).then((res) => {
    dispatch({
      type: DELETE_PRODUCT,
    });
  });
};

export const getProductById = (id) => (dispatch) => {
  Axios.get(`${url}/products/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const putProduct = (values, id) => (dispatch) => {
  Axios.put(`${url}/products/${id}`, values)
    .then((res) => {
      dispatch({
        type: PUT_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
