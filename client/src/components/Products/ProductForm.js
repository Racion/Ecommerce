import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, FormLabel, Row } from "react-bootstrap";
import { getCategories } from "../../Redux/Action/categoryAction";
import { postProducts, putProduct } from "../../Redux/Action/productActions";
import { useParams } from "react-router-dom";
import "./styles.css";

const ProductForm = ({ action }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.category);
  const products = useSelector((state) => state.products.products);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onSubmit = (values, { resetForm }) => {
    if (action === "put") {
      return dispatch(putProduct(values, id));
    } else {
      dispatch(postProducts(values));
      return resetForm();
    }
  };

  const categoriesFiltered = categories.filter((cat) => cat.active);
  const product =
    action === "put"
      ? products.find((prod) => parseInt(prod.id) === parseInt(id))
      : {};

  let initialValuesP = {
    title: action === "put" ? product.title : "",
    category: action === "put" ? product.categories.map((cat) => cat.id) : "",
    stock: action === "put" ? product.stock : "",
    description: action === "put" ? product.description : "",
    price: action === "put" ? product.price : "",
    img: action === "put" ? product.img : "",
  };

  let validation = Yup.object({
    title: Yup.string()
      .min(3, "Deben ser minimo 3 caracteres.")
      .max(50, "Demasiados caracteres")
      .required("Este campo es obligatorio."),
    stock: Yup.number()
      .min(1, "Minimo 1 producto.")
      .max(999, "Maximo 999 productos en stock.")
      .required("Este campo es obligatorio"),
    description: Yup.string()
      .min(20, "Deben ser minimo 20 caracteres.")
      .max(140, "Demasiados caracteres")
      .required("Este campo es obligatorio."),
    category: Yup.number().required(
      "Al menos una categoria debe ser seleccionada."
    ),
    img: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Ingrese una url correcta."
      )
      .required("Este campo es obligatorio."),
    price: Yup.number()
      .min(1, "El precio debe ser minimo 1.")
      .required("Este campo es obligatorio"),
  });
  return (
    <div>
      <Col
        className="card shadow pl-3 pr-3 pb-4 pt-2 mb-3 mx-auto"
        lg="6"
        sm="10"
        xs="10"
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValuesP}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          <Form>
            <Row className="encabezado">
              <h2>{action === "put" ? "Modificar " : "Agregar "}Productos</h2>
            </Row>
            <Row>
              <Col>
                <FormLabel htmlFor="title">Nombre:</FormLabel>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Ingrese nombre..."
                />
                <ErrorMessage name="title" />
              </Col>
              <Col>
                <FormLabel htmlFor="category">Categoria:</FormLabel>
                <Field as="select" id="category" name="category" multiple>
                  <option value="">Seleccione una categoria...</option>
                  {categoriesFiltered.map((categ) => (
                    <option value={categ.id} key={categ.id}>
                      {categ.title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormLabel htmlFor="stock" className="etiqueta">
                  Stock:
                </FormLabel>
                <Field
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Ingrese stock..."
                />
                <ErrorMessage name="stock" />
              </Col>
              <Col>
                <FormLabel htmlFor="price">Ingrese precio:</FormLabel>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Ingrese precio..."
                />
                <ErrorMessage name="price" />
              </Col>
              <Col>
                <FormLabel htmlFor="img">Ingrese imagen:</FormLabel>
                <Field
                  type="url"
                  id="img"
                  name="img"
                  placeholder="Url imagen..."
                />
                <ErrorMessage name="img" />
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
                <ErrorMessage name="description" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit" variant="outline-success">
                  {action === "put" ? "Actualizar" : "Guardar"}
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
      </Col>
    </div>
  );
};

export default ProductForm;
