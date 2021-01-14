import React from "react";
import "./default.css";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts, searchCategories } from "./Redux/Action/searchActions";
import PublicRoutes from './routes/public.routes'
import PrivateRoutes from "./routes/private.routes";

function App() {
  const dispatch = useDispatch();

  const userLog = useSelector((state) => state.user);
  const isAuth = userLog.userLog.role === "admin" ? true : false;

  const onSubmit = (input) => {
    dispatch(searchProducts(input));
  };

  const onSelect = (id) => dispatch(searchCategories(id));

  return (
    <div>
      <Navbar onSubmit={onSubmit} onSelect={onSelect} />
      <PrivateRoutes isAuth={isAuth} />
      <PublicRoutes />
    </div>

  );
}
export default App;