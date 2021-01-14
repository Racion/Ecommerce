import Axios from "axios";
import {
  ORDER_EMAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_ONE_TO,
  REMOVE_ONE_TO,
  GET_CART_DB,
  ADD_CART_DB,
} from "./actionTypes";
const url = "http://localhost:5000";

export const getCartDb = () => (dispatch) => {
  Axios.get(`${url}/user/orders`)
    .then((res) => {
      const order = res.data.filter((order) => order.state === "cart");
      if (!order.length) {
        Axios.post(`${url}/orders`).then((res) => {
          const orderId = res.data.id;
          dispatch({
            type: GET_CART_DB,
            payload: { cartItems: [], orderId },
          });
        });
      } else {
        Axios.get(`${url}/orders/${parseInt(order[0].id)}`).then((res2) => {
          const cartItems = res2.data[0].products;
          const orderId = res2.data[0].id;
          console.log("Axios2", orderId);
          console.log("Axios 2 items ==> ", cartItems);
          dispatch({
            type: GET_CART_DB,
            payload: { cartItems, orderId },
          });
          localStorage.setItem("orderId", orderId);
        });
      }
    })
    .catch((err) => console.log(err));
};

export const addCartToDB = (cart, orderId) => (dispatch) => {
  const cartItems = cart;
  if (!orderId || !cart) return console.log("no order or cart");
  else {
    Axios.post(`${url}/orders/`, { orderId, cartItems })
      .then((res) => {
        console.log("Axios addtodb", res.data);
        dispatch({ type: ADD_CART_DB, payload: res.data });
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  }
};

export const addToCart = (product, orderId) => (dispatch, getState) => {
  if (!orderId) {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExist = false;
    cartItems.forEach((item) => {
      if (item.id === product.id) {
        alreadyExist = true;
        item.count++;
      }
    });
    if (!alreadyExist) {
      cartItems.push({ ...product, count: 1 });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartBackup", JSON.stringify(cartItems));
  } else {
    Axios.post(`${url}/orders/${orderId}`, product)
      .then((res) => {
        dispatch({ type: ADD_TO_CART, payload: { message: "creado" } });
      })
      .catch((err) => console.log(err));
  }
};

export const removeFromCart = (product) => (dispatch, getState) => {
  if (!product.product_order) {
    const cartItems = getState()
      .cart.cartItems.slice()
      .filter((prod) => prod.id !== product.id);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else {
    Axios.put(
      `${url}/orders/${product.product_order.order_id}/${product.id}`,
      product
    ).then((res) =>
      dispatch({
        type: REMOVE_FROM_CART,
        payload: res.data,
      })
    );
  }
};

export const addOne = (product) => (dispatch, getState) => {
  product = { ...product, action: "addOne" };
  if (!product.product_order) {
    const cartItems = getState().cart.cartItems.slice();
    cartItems.filter((prod) => prod.id === product.id)[0].count += 1;
    dispatch({
      type: ADD_ONE_TO,
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else {
    Axios.put(`${url}/orders/${product.product_order.order_id}`, product)
      .then((res) => console.log("added 1"))
      .catch((err) => console.log(err));
  }
};

export const removeOne = (product) => (dispatch, getState) => {
  product = { ...product, action: "removeOne" };
  if (!product.product_order) {
    var cartItems = getState().cart.cartItems.slice();
    cartItems.filter((prod) => prod.id === product.id)[0].count -= 1;
    if (cartItems.filter((prod) => prod.id === product.id)[0].count <= 0) {
      cartItems = getState()
        .cart.cartItems.slice()
        .filter((prod) => prod.id !== product.id);
    }
    dispatch({
      type: REMOVE_ONE_TO,
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else {
    Axios.put(`${url}/orders/${product.product_order.order_id}`, product)
      .then((res) => console.log("added 1"))
      .catch((err) => console.log(err));
  }
};
<<<<<<< HEAD

export const orderEmail = (cartItems) => (dispatch) => {
  console.log(cartItems);
  Axios.post("http://localhost:5000/checkout/mail", cartItems).then((res) => {
    dispatch({
      type: ORDER_EMAIL,
    });
    console.log("enviado");
  });
};
=======
>>>>>>> ac63acf2a419cbb6ee4b79b3fb9cafab3e527ae9
