import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  useRouteMatch,
  Redirect
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  link: {
    color: "#f50057",
    textDecoration: "none",
  },
}));

function MainListItems() {
  const [logOut, setLogOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const classes = useStyles();
  let { path, url } = useRouteMatch();

  useEffect(() => {
    const storage = sessionStorage.getItem('isAdmin');
    setIsAdmin(storage == 'true');
  }, []);

  const logOutMethod = () => {
      sessionStorage.removeItem('token');
      setLogOut(true)
      return <Redirect to='/'/>;
  }

  if (logOut) {
    return <Redirect to='/'/>;
  }

  const body = (
    <Link to={`${url}/users`} className={classes.link} >
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Link>
  );

  return (
    <div>
      <Link to={`${url}`} className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      {isAdmin ? body : ""}
      <Link to={`${url}/customers`} className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
      </Link>
      <ListItem button className={classes.link} onClick={logOutMethod}>
        <ListItemIcon>
          <ExitToApp className={classes.link} />
        </ListItemIcon>
        <ListItemText primary="Sing out" />
      </ListItem>
    </div>
  );
}

export default MainListItems;
