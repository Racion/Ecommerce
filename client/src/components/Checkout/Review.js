import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen de la orden
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem className={classes.listItem} key={product.title}>
            <img src={product.img} alt="Portada no disponible" width="50" height="62"/>
            <ListItemText primary={product.title} secondary={product.desc} />
            <Typography variant="body2">$ {product.price * product.count}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${!cartItems ? ("0,00") : (
                    cartItems.reduce((sum, prod) => {
                        return sum + (prod.price * prod.count)
                    }, 0)) }
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}