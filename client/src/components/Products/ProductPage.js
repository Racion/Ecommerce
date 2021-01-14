import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartDb } from "../../Redux/Action/cartActions";
import { Modal, Button, Container, Row, Col, Image } from "react-bootstrap";
import Ratings from "../Rating/Ratings";
import Reviews from "../Rating/Reviews";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const Product = ({ show, onHide, product }) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const orderId = useSelector((state) => state.cart.orderId);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ marginTop: "30px" }}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {product.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src={product.img} height="270" width="250" rounded />
            </Col>
            <Col xs={12} md={8}>
              <p>{product.description}</p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Body>
        <Container>
          <Row>
            <Col>Stock: {product.stock}</Col>
            <Col>Precio: ${product.price}</Col>
            <Col>
              <Ratings productId={product.id} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Col>
          <Button variant="outline-info" onClick={() => setModalShow(true)}>
            Ver Reviews
          </Button>
        </Col>
        <Button
          variant="outline-success"
          onClick={() => {
            dispatch(addToCart(product, orderId));
            dispatch(getCartDb());
          }}
        >
          <AddShoppingCartIcon fontSize="small" /> Agregar al Carrito
        </Button>
        <Button variant="danger" onClick={onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
      <Reviews
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
    </Modal>
  );
};

export default Product;
