//Dependecies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Visual dependecies
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SvgIcon from "@material-ui/core/SvgIcon";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { Image, Button } from "react-bootstrap";
//Actions
import { getProducts, deleteProduct } from "../../Redux/Action/productActions";

const reload = () => {
  window.location.reload(true);
}

const DenseTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function onDelete(id) {
    dispatch(deleteProduct(id));
  }

  return (
    <div style={{ margin: "2em" }}>
          <TableContainer component={Paper} style={{ marginTop: "2em" }}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell> Img </TableCell>
                  <TableCell align="right"> Title </TableCell>
                  <TableCell align="right"> Active </TableCell>
                  <TableCell align="right"> Stock </TableCell>
                  <TableCell align="right"> Price </TableCell>
                  <TableCell align="center"> Description </TableCell>
                  <TableCell align="right"> Eliminar </TableCell>
                  <TableCell align="right"> Modificar </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell component="th" scope="row">
                      <Image
                        src={game.img}
                        alt="Imagen no disponible"
                        width="224"
                        height="240"
                      />
                    </TableCell>
                    <TableCell align="right">{game.title}</TableCell>
                    <TableCell align="right">{game.active ? "Si" : "No"}</TableCell>
                    <TableCell align="right">{game.stock}</TableCell>
                    <TableCell align="right">{"$" + game.price}</TableCell>
                    <TableCell align="right">{game.description}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          onDelete(game.id);
                          reload();
                        }}
                      >
                        <SvgIcon component={DeleteForeverIcon} />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`/admin/products/edit/${game.id}`}>
                        <Button variant="outline-primary">
                          <SvgIcon component={EditIcon} />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> 
            </Table>
          </TableContainer>      
    </div>
  );
};

export default DenseTable;
