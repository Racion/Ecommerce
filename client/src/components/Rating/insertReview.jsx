import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import { Field, Form, Formik } from "formik";
import { useDispatch} from "react-redux";
import { postReview } from '../../Redux/Action/reviewActions'
import { Button, Col, FormLabel, Row } from "react-bootstrap";
import Rating from '@material-ui/lab/Rating';
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import "./styles.css";


const InsertReview = ({product}) => {

    const [value, setValue] = useState(0);
    const { id } = useParams();

    const dispatch = useDispatch()
    const onSubmit = (values) => {
        dispatch(postReview(values, id))
        console.log(values, id)
    }

    const initialValues = {
        title: '',
        value: value,
        description: '',
    }

    return (
        <div style={{margin:"12px"}}>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form>
                    <Row className="encabezado">
                    <h2>Agregar Review al Producto</h2>
                    </Row>
                    <Row>
                    <Col>
                        <FormLabel htmlFor="stock" className="etiqueta">
                        Titulo del Review
                        </FormLabel>
                        <Field
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Inserte titulo de review"
                        />
                    </Col>
                    <Col>
                        <FormLabel htmlFor="price">Puntuación:</FormLabel>
                        <Rating
                            name="rating-feedback"
                            value={value}
                            precision={0.1}
                            icon={<SportsEsportsIcon fontSize="inherit" />}
                            style={{ color: "#1d7bff" }}
                            onChange={(event, newValue) => { event.preventDefault(); setValue(newValue) }}
                        />
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                        <FormLabel htmlFor="description">
                        Ingrese descripcion:
                        </FormLabel>
                        <Field
                        as="textarea"
                        id="description"
                        name="description"
                        placeholder="Descripcion..."
                        />
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                        <Button type="submit" variant="outline-success">
                        Guardar
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="outline-danger" color="secondary">
                        Cancelar
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Formik>
        </div>
    )
}

export default InsertReview