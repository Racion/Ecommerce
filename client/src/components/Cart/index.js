import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  addOne,
  removeOne,
  getCartDb,
  addCartToDB,
} from "../../Redux/Action/cartActions";
import { Modal, Button } from "react-bootstrap";
import "./styles.css";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const Cart = ({ show, onHide }) => {
  const orderId = useSelector((state) => state.cart.orderId);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartBackup"));
    dispatch(addCartToDB(cart, orderId));
    dispatch(getCartDb());
  }, [dispatch, orderId]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ marginTop: "50px" }}
      scrollable
    >
      <Modal.Header centered>
        <Modal.Title id="contained-modal-title-vcenter">
          E-COMMERCE CART
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        <div className="container mb-4">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col"> </th>
                      <th scope="col">Available</th>
                      <th scope="col" className="text-center">
                        Quantity
                      </th>
                      <th scope="col" className="text-right">
                        Price unity
                      </th>
                      <th scope="col" className="text-right">
                        Price total
                      </th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!cartItems ? (
                      <h2>El carrito esta vacio</h2>
                    ) : (
                      cartItems.map((prod) => (
                        <tr key={prod.id}>
                          <td>
                            {" "}
                            <img
                              src={prod.img}
                              alt="Portada no disponible"
                              width="100"
                              height="125"
                            />{" "}
                          </td>
                          <td> {prod.title} </td>
                          <td>In stock</td>
                          <td>
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => {
                                dispatch(removeOne(prod));
                                dispatch(getCartDb());
                              }}
                            >
                              {" "}
                              <RemoveIcon fontSize="small" />{" "}
                            </Button>
                            {"   "}
                            {prod.count
                              ? prod.count
                              : prod.product_order.product_quantity}
                            {"   "}
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => {
                                dispatch(addOne(prod));
                                dispatch(getCartDb());
                              }}
                            >
                              {" "}
                              <AddIcon fontSize="small" />{" "}
                            </Button>
                          </td>
                          <td className="text-right"> ${prod.price} </td>
                          <td className="text-right">
                            {" "}
                            $
                            {prod.count
                              ? prod.price * prod.count
                              : prod.price *
                                prod.product_order.product_quantity}{" "}
                          </td>
                          <td className="text-right">
                            {" "}
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => {
                                console.log(prod);
                                dispatch(removeFromCart(prod));
                                dispatch(getCartDb());
                              }}
                            >
                              {" "}
                              <RemoveShoppingCartIcon fontSize="small" /> Delete{" "}
                            </Button>{" "}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        Total: $
        {!cartItems
          ? "$0,00"
          : cartItems.reduce((sum, prod) => {
              return prod.count
                ? sum + prod.price * prod.count
                : sum + prod.price * prod.product_order.product_quantity;
            }, 0)}
      </Modal.Footer>
      <Modal.Footer>
        <div className="col mb-2">
          <div className="row">
            <div className="col-sm-12  col-md-6">
              <Button
                size="sm"
                onClick={onHide}
                className="btn btn-block btn-light"
              >
                Continue Shopping
              </Button>
            </div>
            <div className="col-sm-12 col-md-6 text-right">
              <Button
                variant="outline-success"
                size="sm"
                className="btn btn-lg btn-block text-uppercase"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
