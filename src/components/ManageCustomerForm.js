import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import { URLSERVER } from '../environment';

function ManageCustomerForm({ formData, typeForm, manageModal, chargeCustomers }) {
    if(typeForm === 'Add' ) {
        formData = {
            name: "", 
            surname: "", 
            email: ""
        }
    }
  const [data, setData] = useState(formData);
//   const [type, setType] = useState(typeForm);
  const url = `${URLSERVER}customers`;

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendDataForm = (event) => {
    event.preventDefault();
    if(typeForm == 'Update') {
        update();
    } 
    if(typeForm === 'Add') {
        create();
    } 
  }

  const update = () => {
    axios.put(url + '/' + data.id, data, {headers: {
        "x-access-token": "Bearer " + sessionStorage.getItem("token"),
      }})
      .then((response) => {
          manageModal();
          chargeCustomers();

        })
        .catch((error) => {
            alert('limea 50')
        console.log(error)
      })
  }

  const create = () => {
      console.table(data)
      axios.post(url + '/', data, {headers: {
          "x-access-token": "Bearer " + sessionStorage.getItem("token"),
        }})
        .then((response) => {
            manageModal();
            chargeCustomers();
        })
        .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Typography variant="h6" gutterBottom color="secondary">
        {typeForm} Customer
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

export default ManageCustomerForm;
