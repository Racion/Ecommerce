import Axios from "axios";
import { CHANGE_ORDER_STATE } from "./actionTypes";

const url = "http://localhost:5000";

export const changeOrderState = (orderId, event) => (dispatch) => {
  Axios.put(`${url}/orders/stateChange/${orderId}`, event)
    .then((res) =>
      dispatch({
        type: CHANGE_ORDER_STATE,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
