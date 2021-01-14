import React from "react";
import {Link} from 'react-router-dom'
import { Modal, Button, Container, Row, Col } from "react-bootstrap";

const OrderInfo = ({show, onHide, products}) => {

    return(
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{marginTop:"30px", padding:"20px"}}
            scrollable
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Productos en esta orden
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Col align="center"> Imagen </Col>
                        <Col align="center"> Titulo </Col>
                        <Col align="center"> Precio </Col>
                        <Col align="center">Cantidad Comprada</Col>
                        <Col align="center"> Total </Col>
                        <Col align="center">Agregar Review</Col>
                    </Row>
                </Container> 
            {
                products.map(prod => (
                    <Container>
                        <Row>
                            <Col align="center"> <img src={prod.img} alt="Portada no disponible" width="100" height="125"/> </Col>
                            <Col align="center"> {prod.title} </Col>
                            <Col align="center"> ${prod.price} </Col>
                            <Col align="center">{prod.product_order.product_quantity}</Col>
                            <Col align="center"> ${ prod.product_order.total_product_amount } </Col>
                            <Col align="center">
                                <Link to={`/user/insert-review/${prod.id}`}>
                                    <Button size="sm" variant="outline-info">+</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container> 
                ))
            }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Cerrar Detalles
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default OrderInfo;