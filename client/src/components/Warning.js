//Dependencies
import React from "react";
import {Link} from "react-router-dom";

const Warning = () => {
  return (
      <div>
          <h1> PRIMER WARNING!!! </h1>
          <h1> USTED NO TIENE PERMISO PARA ESTAR AQUI!!! </h1>
          <h2> Por favor retorne al <Link to="/"> Home </Link> </h2>
      </div>  
  );
};

export default Warning;
