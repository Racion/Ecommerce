import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { postCategory } from "../../Redux/Action/categoryAction";

const initialValues = {
  title: "",
};

const AddCategory = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(postCategory(values));
    resetForm();
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Deben ser al menos 3 caracteres")
      .max(20, "Demasiados caracteres")
      .required("Este campo es obligatorio."),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5rem",
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Col className="my-3">
            <Form.Label>Nueva Categoria</Form.Label>
            <Form.Control
              placeholder="Ingrese la categoria"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.errors.title ? (
              <Form.Text className="text-danger">
                {formik.errors.title}
              </Form.Text>
            ) : null}
          </Col>
        </Form.Row>
        <Form.Row>
          <Button variant="success" type="submit" size="sm" block>
            Guardar
          </Button>
        </Form.Row>
      </Form>
    </div>
  );
};

export default AddCategory;
