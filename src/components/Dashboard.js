import React from "react";
import MainListItems from "./MainListItems";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";
  import Users from './Users'
  import Customers from './Customers'

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    header: {
        backgroundColor:"#f50057",
        color: "#fff",
        padding: "10px"
    }
  }));

function Dashboard() {
    let { path, url } = useRouteMatch();
    const classes = useStyles();
    return (
        <Grid container>
        <Box></Box>
        <Grid item xs={12} className={classes.header}> 
        <Typography variant="h5" component="h2" gutterBottom>
        Basic CRM
      </Typography>
        </Grid>
        <Grid item sm={12} md={2} >
            <MainListItems></MainListItems>
        </Grid>
      {/* <Grid item xs={12} sm={12} md={10}>
      <PersonList customers={customers} title="Clientes"></PersonList>
        </Grid> */}
        <Grid item xs={12} sm={12} md={10}>

         <Switch>
         <Route exact path={`${path}`}>
          Hola
        </Route>
         <Route path={`${path}/customers`}>
          <Customers />
        </Route>
         <Route path={`${path}/users`}>
          <Users />
        </Route>
        </Switch>
        </Grid>
      </Grid>
    )
}

export default Dashboard
