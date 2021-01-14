import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Catalogue from "./Catalogue/Catalogue";
import Pages from "./Catalogue/Pages.jsx";
import { getProducts } from "../Redux/Action/productActions";

const Home = ({ result }) => {
  const validate = result.length > 0;
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    validate ? result : state.products.products
  );
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);

  const productsFiltered = products.filter(
    (p) => p.stock > 0 && p.active === true
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const ultPage = currentPage * postPerPage;
  const frstPage = ultPage - postPerPage;
  const currentPosts = productsFiltered.slice(frstPage, ultPage);

  const page = (num) => {
    setCurrentPage(num);
  };

  return (
    <>
      <Catalogue products={currentPosts} />
      <Pages
        postPerPage={postPerPage}
        totalPosts={productsFiltered.length}
        currentPage={currentPage}
        page={page}
      />
    </>
  );
};

export default Home;
