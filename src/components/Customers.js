import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import PersonList from './PersonList';



function Customers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    axios
      .get("http://localhost:8080/customers", {
        headers: {
          "x-access-token": "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setCustomers(resp.data);
      })
      .catch((err) => {
        console.log("Error en la autenticación" + err);
      });
  };
  return (
    <Grid container>
        {/* <Box></Box>
        <Grid item xs={12} className={classes.header}> 
        <Typography variant="h5" component="h2" gutterBottom>
        Basic CRM
      </Typography>
        </Grid>
        <Grid item sm={12} md={2} >
            <MainListItems></MainListItems>
        </Grid> */}
      <Grid item xs={12} sm={12} md={10}>
      <PersonList customers={customers} title="Clientes"></PersonList>
        </Grid>
    </Grid>
  );
}

export default Customers;
