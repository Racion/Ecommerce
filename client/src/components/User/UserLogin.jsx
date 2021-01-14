import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
// import * as yup from "yup";
// import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { logInUser, logInGoogle } from "../../Redux/Action/userActions";
import { Button, Row, Col } from "react-bootstrap";
import { AiOutlineGoogle } from "react-icons/ai";

// const validationSchema = yup.object({
//   email: yup
//     .string()
//     .matches(
//       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//       "Debe poner un mail valido"
//     )
//     .required("Este campo es obligatorio."),
//   password: yup
//     .string()
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//       "Minimo 8 caracteres incluyendo un numero"
//     )
//     .required("Este campo es obligatorio."),
// });

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theedgesusu.co.uk%2Fwp-content%2Fuploads%2F2017%2F01%2FGames_Controllers.jpg&f=1&nofb=1)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(logInUser(values));
    resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    // validationSchema,
  });

  const classes = useStyles();
  return (
    <Grid
      enableReinitialize={true}
      container
      component="main"
      className={classes.root}
    >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              name="email"
              autoFocus
              onBlur={formik.onBlur}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur={formik.onBlur}
            />
            <Row>
              <Col>
                <Button type="submit" variant="outline-primary" size="sm">
                  Sign In
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => dispatch(logInGoogle)}
                >
                  <AiOutlineGoogle /> Sign In with Google
                </Button>
              </Col>
            </Row>
            <Grid container>
              <Grid item xs>
                <Link to="/user/password/reset">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/user/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default SignIn;
