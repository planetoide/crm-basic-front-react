import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import { URLSERVER } from '../environment';

function ModalForm({ formData, typeForm, manageModal }) {
    formData.password = "haymishijos";
  const [data, setData] = useState(formData);
  const [path, setPath] = useState(typeForm === 'Clientes' ? 'customers' : 'users');
  const url = `${URLSERVER}path`;
  const [active, setActive] = useState({
    isActive: !formData.active
  });

  const handleChange = name => event  => {
    setActive({ [name]: event.target.checked });
    setData({
        ...data,
        active: event.target.checked,
      });
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendDataForm = (event) => {
    event.preventDefault();
    setData({
        ...data,
        password: 'haymishijos'
    });
    axios.put(url + '/' + data.id, data, {headers: {
        "x-access-token": "Bearer " + sessionStorage.getItem("token"),
      }})
      .then((response) => {
          manageModal();

        })
        .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Typography variant="h6" gutterBottom color="secondary">
        {typeForm}
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox 
                color="secondary" 
                name="isActive" 
                value="yes"
                checked={active.isActive}
                onChange={handleChange('isActive')} />
            }
            label="Activate"
          />
        </Grid>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
            >
                Update
            </Button>
      </Grid>
      </form>
    </>
  );
}

export default ModalForm;
