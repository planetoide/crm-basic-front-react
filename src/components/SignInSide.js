import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "./Copyright";
import fondo from '../assets/fondo2.jpg';
import axios from "axios";
import {
    Redirect,
  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(" + fondo +")",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [datos, setDatos] = useState({
      userName: "",
      password: "",
    });
  const [token, setToken] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const autenticacion = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/auth", datos)
      .then((response) => {
        setToken(response.data.token);
        console.log(token)
        sessionStorage.setItem("token", response.data.token);
        setRedirect(true);
      })
      .catch((error) => {
        console.log(error)
        alert("datos erroneos")
        setDatos({
            ...datos,
            userName: "",
            password: "",
          });
      })
} 

if (redirect) {
    return <Redirect to='/Dashboard'/>;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={autenticacion}>
            <TextField
              variant="outlined"
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="email"
              label="User"
              name="userName"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
              helperText={token !== "" ? "buena" : "Incorrect entry."}
              error = {false}
            />
            <TextField
              variant="outlined"
              margin="normal"
              color="secondary"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <Box align="center">
              <Typography variant="subtitle2"  color="secondary" className={classes.pass}>
               User: Administrator <br></br> Password: password12354
              </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Box mt={3}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
