import React from "react";
import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import { PublicRoute } from "./helperRoutes";
import Home from "../components/Home";
import UserForm from "../components/User/UserForm";
import UserLogin from "../components/User/UserLogin";
import UserProfile from "../components/User/UserProfile";
import UserReset from "../components/User/UserReset.jsx";
import insertReview from "../components/Rating/insertReview";

const PublicRoutes = () => {
  const result = useSelector((state) => state.search.result);
  return (
    <Switch>
      <PublicRoute exact path="/" component={() => <Home result={result} />} />
      <PublicRoute exact path="/user/register" component={UserForm} />
      <PublicRoute exact path="/user/login" component={UserLogin} />
      <PublicRoute exact path="/user/profile" component={UserProfile} />
      <PublicRoute exact path="/user/password/reset" component={UserReset} />
      <PublicRoute
        exact
        path="/user/insert-review/:id"
        component={insertReview}
      />
    </Switch>
  );
};
=======
import {PublicRoute} from './helperRoutes'
import Home from '../components/Home'
import UserForm from '../components/User/UserForm'
import UserLogin from '../components/User/UserLogin'
import UserProfile from '../components/User/UserProfile'
import UserReset from '../components/User/UserReset.jsx'
import Checkout from "../components/Checkout/Checkout.js";
import insertReview from '../components/Rating/insertReview'
 
const PublicRoutes = () => {
    const result = useSelector((state) => state.search.result);
    return (
        <Switch>
            <PublicRoute exact path="/" component={() => <Home result={result}/>} />
            <PublicRoute path="/user/register" component={UserForm} />
            <PublicRoute path="/user/login" component={UserLogin}/>
            <PublicRoute path="/user/profile" component={UserProfile} />
            <PublicRoute path="/user/password/reset" component={UserReset} />
            <PublicRoute path="/user/checkout" component={Checkout} />             
            <PublicRoute exact path="/user/insert-review/:id" component={insertReview} />
        </Switch>
    )
}
>>>>>>> ac63acf2a419cbb6ee4b79b3fb9cafab3e527ae9

export default PublicRoutes;
