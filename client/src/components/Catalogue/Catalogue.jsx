import React from "react";
import ProductCard from "../Products/ProductCard.jsx";
import "./Catalogue.css";

const Catalogue = ({ products }) => {
  return (
    <div className="cards">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
        />
      ))}
    </div>
  );
};

export default Catalogue;
