import React from 'react'
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import Ratings from './Ratings.jsx'
import IndividualRating from './IndividualRating.jsx'
import { useSelector } from "react-redux";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';



const Reviews = ({show, onHide, product}) => {

    const reviews = useSelector((state) => state.review.reviews);
    const reviewsFiltered = reviews.filter(r => r.productId === product.id)

    if (reviewsFiltered[0] !== undefined){
      return (
        <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{marginTop:"30px"}}
      scrollable
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Reviews acerca de {product.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
      {
          reviewsFiltered.map(d => (
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                        <h4>{d.title}</h4>
                        <span className="blockquote-footer">{d.createdAt.substring(0,10)}</span>
                        <cite className="blockquote-footer">Publicado por: {d.user.name + ' ' + d.user.lastname}</cite>
                        </Col>
                        <Col xs={6} md={4}>
                          <IndividualRating rating={d.value}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                          <p>{d.description}</p>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            
          ))
      }
      </Modal.Body>
      <Modal.Footer>
        <Col xs={12} md={8}>
            Promedio de calificaciones: {<Ratings productId={product.id}/>}
        </Col>
        <Button variant="outline-danger" onClick={onHide}>
            Cerrar Reviews
        </Button>
      </Modal.Footer>
    </Modal>
    )
    } else {
      return (
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
          Reviews acerca de {product.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <cite>Aún no se publicaron reviews para este juego, prueba nuevamente más tarde <SentimentDissatisfiedIcon /></cite>
      </Modal.Body>
      <Modal.Footer>
        <Col xs={12} md={8}>
            Promedio de calificaciones: {<Ratings productId={product.id}/>}
        </Col>
        <Button variant="outline-danger" onClick={onHide}>
            Cerrar Reviews
        </Button>
      </Modal.Footer>
    </Modal>
      )
    }

    
}

export default Reviews
