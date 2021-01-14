//Dependencies
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
//Visual dependencies
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
import {Button} from "react-bootstrap";
//Actions
import {getCategories, deleteCategory} from "../../Redux/Action/categoryAction";

const reload = () => {
  window.location.reload(true);
}

const TableCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function onDelete(id) {
    dispatch(deleteCategory(id));
  }

  return (
    <div style={{margin: "2em"}}>
        <TableContainer component={Paper} style={{marginTop: "2em"}}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center"> Titulo </TableCell>
                <TableCell align="center"> Active </TableCell>
                <TableCell align="center"> Eliminar </TableCell>
                <TableCell align="center"> Modificar </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell align="center">{category.title}</TableCell>
                  <TableCell align="center">
                    {category.active ? "Si" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        onDelete(category.id);
                        reload();
                      }}
                    >
                      <SvgIcon component={DeleteForeverIcon} />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button>
                      <SvgIcon component={EditIcon} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
};

export default TableCategory;
