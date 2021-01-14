import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersUser } from "../../Redux/Action/userActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "react-bootstrap";
import OrderInfo from "../Orders/OrderInfo";

const UserProfile = () => {
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.user.userLog);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  console.log("userprof", orders);

  useEffect(() => {
    dispatch(getOrdersUser());
  }, [dispatch]);

  return (
    <div>
      <div className="text-left" style={{ margin: "2rem" }}>
        Nombre: <h3>{user.name + " " + user.lastname}</h3>
        Correo: <h3>{user.email}</h3>
      </div>
      <div>
        <h5 className="text-center">~ Todas tus ordenes ~</h5>
        <div>
          {!orders ? (
            <div>
              <h2 className="text-center">
                EL USUARIO AUN NO CUENTA CON UNA ORDEN
              </h2>
            </div>
          ) : (
            <TableContainer component={Paper} style={{ marginTop: "2em" }}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"> ID </TableCell>
                    <TableCell align="center"> State </TableCell>
                    <TableCell align="center"> Date </TableCell>
                    <TableCell align="center"> Total price </TableCell>
                    <TableCell align="center">Ver mas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell align="center">{order.id}</TableCell>
                      <TableCell align="center">{order.state}</TableCell>
                      <TableCell align="center">{order.createdAt}</TableCell>
                      <TableCell align="center">
                        {"$" + order.total_price}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="sm"
                          variant="outline-info"
                          onClick={() => setModalShow(true)}
                        >
                          +
                        </Button>
                      </TableCell>
                      <OrderInfo
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        products={order.products}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
