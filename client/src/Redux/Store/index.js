import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import productsReducer from "../Reducers/productReducer";
import cartReducer from "../Reducers/cartReducer";
import categoryReducer from "../Reducers/categoryReducer";
import searchReducer from "../Reducers/searchReducer";
import reviewReducer from "../Reducers/reviewReducer";
import userReducer from "../Reducers/userReducer";
import ordersReducer from '../Reducers/ordersReducer'
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    search: searchReducer,
    category: categoryReducer,
    cart: cartReducer,
    review: reviewReducer,
    user: userReducer,
    orders: ordersReducer
  }),
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
