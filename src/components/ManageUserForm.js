import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios'

function ManageUserForm({ formData, typeForm, manageModal, chargeUsers }) {
  console.log(formData)
  if(!formData.name) {
    formData = {
      email: "",
      name: "",
      password: "",
      surname: ""
    }
  }
  const [data, setData] = useState(formData);
  const [path, setPath] = useState('users');
  const url = 'http://localhost:8080/'  + path;
  const [active, setActive] = useState({
    isActive: !formData.active
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendDataForm = (event) => {
    event.preventDefault();
    if(typeForm == 'Update') {
      axios.put(url + '/' + data.id, data, {headers: {
          "x-access-token": "Bearer " + sessionStorage.getItem("token"),
        }})
        .then((response) => {
            manageModal();
            chargeUsers();
          })
          .catch((error) => {
          console.log(error)
        })
    } 
    if(typeForm == 'Add') {
      axios.post(url + '/', data, {headers: {
          "x-access-token": "Bearer " + sessionStorage.getItem("token"),
        }})
        .then((response) => {
            manageModal();
            chargeUsers();
  
          })
          .catch((error) => {
          console.log(error)
        })
    } 
  }

  return (
    <>
      <Typography variant="h6" gutterBottom color="secondary">
        {typeForm} chale
      </Typography>
      <form noValidate onSubmit={sendDataForm}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="firstName"
            name="name"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={data.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="lastName"
            name="surname"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={data.surname}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            value={data.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="password"
            fullWidth
            value={data.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
            >
               {typeForm}
            </Button>
      </Grid>
      </form>
    </>
  );
}

export default ManageUserForm;
