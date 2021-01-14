import {
  ADD_TO_CART,
  ADD_ONE_TO,
  REMOVE_ONE_TO,
  GET_CART_DB,
  ADD_CART_DB,
} from "../Action/actionTypes.js";

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case GET_CART_DB:
      return {
        cartItems: action.payload.cartItems,
        orderId: action.payload.orderId,
      };
    case ADD_TO_CART:
      return { cartItems: action.payload.cartItems };
    case ADD_ONE_TO:
      return { cartItems: action.payload.cartItems };
    case REMOVE_ONE_TO:
      return { cartItems: action.payload.cartItems };
    case ADD_CART_DB:
      return { cartItems: action.payload.cartItems };
    default:
      return state;
  }
};

export default cartReducer;
