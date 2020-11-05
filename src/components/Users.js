import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import PersonList from './PersonList';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    getCustomers();
    }, []);

  const getCustomers = () => {
    axios
      .get("http://localhost:8080/users", {
        headers: {
          "x-access-token": "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setUsers(resp.data);
      })
      .catch((err) => {
        console.log("Error en la autenticación" + err);
      });
  };
    return (
        <Grid container>
      <Grid item xs={12} sm={12} md={10}>
      <PersonList customers={users} title="Usuarios"></PersonList>
        </Grid>
        </Grid>
    )
}

export default Users
