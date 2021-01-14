//Dependeces
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { getCategories } from "../../Redux/Action/categoryAction";
import Cart from "../Cart/index";

// Autenticacion
import { logOutUser, userProfile } from "../../Redux/Action/userActions";

//Visual Dependences
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TableChartIcon from "@material-ui/icons/TableChart";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import GamesIcon from "@material-ui/icons/Games";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import GradeIcon from "@material-ui/icons/Grade";
import { getCartDb } from "../../Redux/Action/cartActions";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    display: "none",
    textDecoration: "none",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  Botones: {
    fontSize: 11,
    color: "black",
    marginLeft: theme.spacing(1),
  },
  avatar: {
    marginLeft: theme.spacing(9),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  star: {
    fontSize: "26px",
    color: "yellow",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(10.8),
  },
  logOut: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    height: theme.spacing(4),
  },
  guest: {
    marginLeft: theme.spacing(9.7),
  },
  guestRegister: {
    marginLeft: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(23),
      width: "50%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  titleCard: {
    marginLeft: theme.spacing(6.3),
    // marginTop: theme.spacing(1),
    fontSize: 14,
  },
  welcome: {
    marginLeft: theme.spacing(7.5),
    marginTop: theme.spacing(1),
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function PrimarySearchAppBar({ onSubmit, onSelect }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("Navbar cart ==>", cartItems);
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [categorias, setCategorias] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.category);
  const categoryFilter = categories.filter((cat) => cat.active === true);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(userProfile());
    dispatch(getCartDb());
  }, [dispatch]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickCategory = () => {
    setOpenCategory(!openCategory);
  };
  const changeCategorias = () => {
    setCategorias(!categorias);
  };

  const handleDrawer = () => {
    setOpenNav(true);
  };

  const userLog = useSelector((state) => state.user);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link
            to="/"
            onClick={() => window.location.replace("/")}
            style={{ textDecoration: "none" }}
          >
            <Typography className={classes.title} variant="h6" noWrap>
              VideoGames
            </Typography>
          </Link>

          <form
            className={classes.search}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(input);
              setInput("");
            }}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <InputBase
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder="Search…"
              value={input}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </form>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => setModalShow(true)}
            >
              <Badge
                // badgeContent={cartItems.length}
                badgeContent={0}
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SwipeableDrawer
        anchor="left"
        variant="temporary"
        open={openNav}
        onOpen={() => ""}
        onClose={() => setOpenNav(false)}
      >
        {userLog.userLog.role === "admin" ? (
          <div style={{ height: "100%", width: "220px" }}>
            <List>
              <Card>
                <CardContent className={classes.root}>
                  <Avatar className={classes.avatar}>
                    {userLog.userLog.name[0].toUpperCase()}
                  </Avatar>
                  <GradeIcon className={classes.star} />
                  <Typography
                    className={classes.welcome}
                    color="textPrimary"
                    gutterBottom
                  >
                    Welcome!
                  </Typography>
                  <Typography
                    className={classes.titleCard}
                    color="textSecondary"
                    gutterBottom
                  >
                    {`${userLog.userLog.name}`}
                  </Typography>
                  <ButtonGroup
                    className={classes.logOut}
                    aria-label="outlined secondary button group"
                    disableElevation
                    color="secondary"
                  >
                    <Link to="/user/profile">
                      <Button className={classes.Botones}>Profile</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        dispatch(logOutUser());
                        setOpenNav(false);
                      }}
                      className={classes.Botones}
                      style={{
                        color: "red",
                        border: "1px solid red",
                        fontWeight: "bold",
                      }}
                    >
                      Log Out
                    </Button>
                  </ButtonGroup>
                </CardContent>
              </Card>

              <Link to="/" onClick={() => setOpenNav(false)}>
                <ListItem button onClick={() => window.location.replace("/")}>
                  <ListItemIcon>
                    {" "}
                    <HomeIcon fontSize="medium" />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  {" "}
                  <VideogameAssetIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Products" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link
                    className={classes.link}
                    to="/admin/products/add"
                    onClick={() => setOpenNav(false)}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        {" "}
                        <AddBoxIcon fontSize="small" />{" "}
                      </ListItemIcon>
                      <ListItemText className={classes.link} primary="Add" />
                    </ListItem>
                  </Link>
                  <Link
                    className={classes.link}
                    to="/admin/products/table"
                    onClick={() => setOpenNav(false)}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        {" "}
                        <TableChartIcon fontSize="small" />{" "}
                      </ListItemIcon>
                      <ListItemText className={classes.link} primary="Table" />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
              <ListItem button onClick={handleClickCategory} value="category">
                <ListItemIcon>
                  {" "}
                  <VideogameAssetIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Categories" />
                {openCategory ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openCategory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link
                    className={classes.link}
                    to="/admin/categories/add"
                    onClick={() => setOpenNav(false)}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        {" "}
                        <AddBoxIcon fontSize="small" />{" "}
                      </ListItemIcon>
                      <ListItemText className={classes.link} primary="Add" />
                    </ListItem>
                  </Link>
                  <Link
                    className={classes.link}
                    to="/admin/categories/table"
                    onClick={() => setOpenNav(false)}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        {" "}
                        <TableChartIcon fontSize="small" />{" "}
                      </ListItemIcon>
                      <ListItemText className={classes.link} primary="Table" />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
              <ListItem button onClick={changeCategorias} value="category">
                <ListItemIcon>
                  {" "}
                  <VideogameAssetIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Select Categories" />
                {categorias ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={categorias} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => onSelect()}
                  >
                    <ListItemIcon>
                      {" "}
                      <GamesIcon fontSize="small" />{" "}
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary="Todas" />
                  </ListItem>
                  {categoryFilter.map((cat) => (
                    <ListItem
                      key={cat.id}
                      button
                      className={classes.nested}
                      onClick={() => {
                        onSelect(cat.id);
                        setOpenNav(false);
                      }}
                    >
                      <ListItemIcon>
                        {" "}
                        <GamesIcon fontSize="small" />{" "}
                      </ListItemIcon>
                      <ListItemText
                        className={classes.link}
                        primary={cat.title}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <Link to="/admin/orders/table" onClick={() => setOpenNav(false)}>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <VideogameAssetIcon fontSize="medium" />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>
              </Link>
              <Link to="/admin/users/table" onClick={() => setOpenNav(false)}>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <VideogameAssetIcon fontSize="medium" />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </Link>
            </List>
          </div>
        ) : userLog.userLog.id ? (
          <div style={{ height: "100%", width: "240px" }}>
            <List>
              <Card>
                <CardContent className={classes.root}>
                  <Avatar className={classes.avatar}>
                    {userLog.userLog.name[0].toUpperCase()}
                  </Avatar>
                  <Typography
                    className={classes.welcome}
                    color="textPrimary"
                    gutterBottom
                  >
                    Welcome!
                  </Typography>
                  <Typography
                    className={classes.titleCard}
                    color="textSecondary"
                    gutterBottom
                  >
                    {`${userLog.userLog.name}`}
                  </Typography>
                  <ButtonGroup
                    className={classes.logOut}
                    aria-label="outlined secondary button group"
                    disableElevation
                    color="secondary"
                  >
                    <Link to="/user/profile">
                      <Button
                        onClick={() => setOpenNav(false)}
                        className={classes.Botones}
                      >
                        Profile
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        dispatch(logOutUser());
                        setOpenNav(false);
                      }}
                      className={classes.Botones}
                      style={{
                        color: "red",
                        border: "1px solid red",
                        fontWeight: "bold",
                      }}
                    >
                      Log Out
                    </Button>
                  </ButtonGroup>
                </CardContent>
              </Card>
              <Link to="/" onClick={() => setOpenNav(false)}>
                <ListItem button onClick={() => window.location.replace("/")}>
                  <ListItemIcon>
                    {" "}
                    <HomeIcon fontSize="medium" />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>
              <ListItem button onClick={changeCategorias} value="category">
                <ListItemIcon>
                  {" "}
                  <VideogameAssetIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Select Categories" />
                {categorias ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={categorias} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => onSelect()}
                  >
                    <ListItemIcon>
                      {" "}
                      <GamesIcon fontSize="small" />{" "}
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary="Todas" />
                  </ListItem>
                  {categoryFilter.map((cat) => (
                    <ListItem
                      key={cat.id}
                      button
                      className={classes.nested}
                      onClick={() => {
                        onSelect(cat.id);
                        setOpenNav(false);
                      }}
                    >
                      <ListItemIcon>
                        {" "}
                        <GamesIcon fontSize="small" />{" "}
                      </ListItemIcon>
                      <ListItemText
                        className={classes.link}
                        primary={cat.title}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </div>
        ) : (
          <div style={{ height: "100%", width: "240px" }}>
            <List>
              <Card>
                <CardContent className={classes.root}>
                  <Avatar className={classes.avatar}>G</Avatar>
                  <Typography
                    className={classes.welcome}
                    color="textPrimary"
                    gutterBottom
                  >
                    Welcome!
                  </Typography>
                  <Typography
                    className={classes.guest}
                    color="textSecondary"
                    gutterBottom
                  >
                    Guest
                  </Typography>
                  <ButtonGroup
                    className={classes.guestRegister}
                    aria-label="outlined secondary button group"
                    disableElevation
                    color="secondary"
                  >
                    <Link to="/user/login">
                      <Button
                        onClick={() => setOpenNav(false)}
                        className={classes.Botones}
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/user/register">
                      <Button
                        onClick={() => setOpenNav(false)}
                        className={classes.Botones}
                        style={{
                          border: "1px solid black",
                          fontWeight: "bold",
                        }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </ButtonGroup>
                </CardContent>
              </Card>
              <Link to="/" onClick={() => setOpenNav(false)}>
                <ListItem button onClick={() => window.location.replace("/")}>
                  <ListItemIcon>
                    {" "}
                    <HomeIcon fontSize="medium" />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>
              <ListItem button onClick={changeCategorias} value="category">
                <ListItemIcon>
                  {" "}
                  <VideogameAssetIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Select Categories" />
                {categorias ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={categorias} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => onSelect()}
                  >
                    <ListItemIcon>
                      {" "}
                      <GamesIcon fontSize="small" />{" "}
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary="Todas" />
                  </ListItem>
                  {categoryFilter.map((cat) => (
                    <ListItem
                      key={cat.id}
                      button
                      className={classes.nested}
                      onClick={() => {
                        onSelect(cat.id);
                        setOpenNav(false);
                      }}
                    >
                      <ListItemIcon>
                        {" "}
                        <GamesIcon fontSize="small" />{" "}
                      </ListItemIcon>
                      <ListItemText
                        className={classes.link}
                        primary={cat.title}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </div>
        )}
      </SwipeableDrawer>
      <Cart show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
