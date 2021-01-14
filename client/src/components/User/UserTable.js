import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import SvgIcon from "@material-ui/core/SvgIcon";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Button } from "react-bootstrap";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  const reload = () => {
    window.location.reload(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // const options = [
  //   { value: "cart", label: "cart" },
  //   { value: "create", label: "create" },
  //   { value: "processing", label: "processing" },
  //   { value: "cancelled", label: "cancelled" },
  //   { value: "complete", label: "complete" },
  // ];

  function onPromote(id) {
    console.log(id);
    axios
      .put(`http://localhost:5000/user/promote/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div style={{ margin: "2em" }}>
      <TableContainer component={Paper} style={{ marginTop: "2em" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center"> User ID </TableCell>
              <TableCell align="center"> Name </TableCell>
              <TableCell align="center"> Lastname </TableCell>
              <TableCell align="center"> Email </TableCell>
              <TableCell align="center"> Puesto </TableCell>
              <TableCell align="center"> Ascender </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.lastname}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.idAdmin}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      onPromote(user.id);
                      reload();
                    }}
                  >
                    <SvgIcon component={NavigationIcon} />
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

export default UsersTable;
