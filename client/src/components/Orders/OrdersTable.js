import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import { getOrdersUser } from "../../Redux/Action/userActions";
import { changeOrderState } from "../../Redux/Action/orderAction";

const OrdersTable = () => {
  const orders = useSelector((state) => state.orders.orders);
  console.log("table", orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersUser());
  }, [dispatch]);
  const options = [
    { value: "cart", label: "cart" },
    { value: "create", label: "create" },
    { value: "processing", label: "processing" },
    { value: "cancelled", label: "cancelled" },
    { value: "complete", label: "complete" },
  ];

  return (
    <div style={{ margin: "2em" }}>
      <TableContainer component={Paper} style={{ marginTop: "2em" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center"> Order ID </TableCell>
              <TableCell align="center"> User ID </TableCell>
              <TableCell align="center"> State </TableCell>
              <TableCell align="center"> Date </TableCell>
              <TableCell align="center"> Total price </TableCell>
              <TableCell align="center"> Change state </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{order.userId}</TableCell>
                <TableCell align="center">{order.state}</TableCell>
                <TableCell align="center">{order.createdAt}</TableCell>
                <TableCell align="center">{"$" + order.total_price}</TableCell>
                <TableCell align="center">
                  <Select
                    options={options}
                    onChange={(event) => {
                      dispatch(changeOrderState(order.id, event));
                      return window.location.replace("/admin/orders/table");
                    }}
                  >
                    {options.map((option) => (
                      <option value={option.value}> {option.label} </option>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
