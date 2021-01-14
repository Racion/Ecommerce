import React from "react";
import { Switch } from "react-router-dom";
import AddCategory from "../components/Category/AddCategory";
import Tabla from "../components/Products/Tabla";
import TableCategory from "../components/Category/TableCategory";
import OrdersTable from "../components/Orders/OrdersTable";
import ProductForm from "../components/Products/ProductForm";
import UserForm from "../components/User/UserForm";
import UserLogin from "../components/User/UserLogin";
import UsersTable from "../components/User/UserTable";
import { PrivateRoute } from "./helperRoutes";

const PrivateRoutes = ({ isAuth }) => {
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/admin/products/add"
        component={ProductForm}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path="/admin/products/edit/:id"
        component={() => <ProductForm action="put" />}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path="/admin/products/table"
        component={Tabla}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path="/admin/categories/add"
        component={AddCategory}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path="/admin/categories/table"
        component={TableCategory}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path="/admin/orders/table"
        component={OrdersTable}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path="/admin/users/table"
        component={UsersTable}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path="/user/form"
        component={UserForm}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path="/user/register"
        component={UserForm}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path="/user/login"
        component={UserLogin}
        isAuth={isAuth}
      />
    </Switch>
  );
};

export default PrivateRoutes;
