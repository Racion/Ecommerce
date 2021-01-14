import { GET_ORDERS } from "../Action/actionTypes";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        orders: action.payload,
      };
    default:
      return state;
  }
};
export default ordersReducer;
