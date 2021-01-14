import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartDb } from "../../Redux/Action/cartActions";
import { Button, Card } from "react-bootstrap";
import ProductPage from "./ProductPage.js";
import Ratings from "../Rating/Ratings";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const colorCategories = {
  1: "blue",
  2: "red",
  3: "purple",
  4: "green",
};

const ProductCard = ({ product }) => {
  const num = product.categories[0].id;
  const color = colorCategories[num];
  const orderId = useSelector((state) => state.cart.orderId);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <Card
      style={{
        width: "15rem",
        margin: "0.5rem",
        padding: "0.5rem",
        borderColor: color,
      }}
    >
      <Card.Img variant="top" src={product.img} fluid="true" />
      <Card.Body className="text-center">
        <Card.Title>{product.title}</Card.Title>
      </Card.Body>
      <Card.Footer className="text-center">
        <Ratings productId={product.id} />
        <Card.Text>${product.price}</Card.Text>
        <Button
          variant="outline-info"
          size="sm"
          onClick={() => setModalShow(true)}
        >
          Ver más
        </Button>{" "}
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => {
            dispatch(addToCart(product, orderId));
            dispatch(getCartDb());
          }}
        >
          <AddShoppingCartIcon fontSize="small" />
        </Button>
      </Card.Footer>
      <ProductPage
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
    </Card>
  );
};

export default ProductCard;
