import Axios from "axios";
import { GET_REVIEWS } from "./actionTypes";

const url = "http://localhost:5000";

export const getReviews = () => (dispatch) => {
    Axios.get(`${url}/review`)
    .then((res) => {
        dispatch({
          type: GET_REVIEWS,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
}

export const postReview = (values, productId) => {
  Axios.post(`${url}/review/${productId}`, values)
  .then(() => {
    return window.location.replace('/')
  })
}