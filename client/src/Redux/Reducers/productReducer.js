import {
  GET_PRODUCT,
  GET_PRODUCTS,
  POST_PRODUCTS,
  PUT_PRODUCT,
} from "../Action/actionTypes";

const initialState = {
  products: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case POST_PRODUCTS:
      return {
        product: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        productId: action.payload,
      };
    case PUT_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    default:
      return state;
  }
};

export default productsReducer;
