import React, { useState, useEffect } from "react";
import axios from "axios";
// import PersonList from './PersonList';
import ManageCustomerForm from "./ManageCustomerForm";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Update from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { URLSERVER } from '../environment';

// Generate Order Data
function createData(id, name, surname, email, active) {
  return { id, name, surname, email, active };
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    marginTop: "10px",
  },
}));

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectetItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState("");
  const rows = [];

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    axios
      .get(`${URLSERVER}customers`, {
        headers: {
          "x-access-token": "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setCustomers(resp.data);
        console.log()
      })
      .catch((err) => {
        console.log("Error en la autenticación" + err);
      });
  };

  const openDeleteCustomerModal = (id) => {
    axios
      .delete(`${URLSERVER}customers/` + id, {
        headers: {
          "x-access-token": "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((resp) => {
        getCustomers();
      })
      .catch((err) => {
        console.log("Error en la autenticación" + err);
      });
  }
  //

  customers.map((item) => {
    if(!item.deleted) {
      return rows.push(
        createData(item.id, item.name, item.surname, item.email, item.deleted)
      );
    }
  });

  const handleOpen = (row) => {
    if (row.name) {
      setTypeModal("Update");
    } else {
      setTypeModal("Add");
    }
    setOpen(true);
    setSelectedItem(row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ManageCustomerForm
        formData={selectetItem}
        typeForm={typeModal}
        manageModal={handleClose}
        chargeCustomers={getCustomers}
      ></ManageCustomerForm>
    </div>
  );

  return (
    <Grid container>
      {/* <Grid item xs={12} sm={12} md={10}> */}
        <Grid item xs={12} sm={12} md={10} className={classes.title}>
          <Grid item md={9}>
            <Title>Customers</Title>
          </Grid>
          <Grid container item md={3} alignContent="flex-start">
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleOpen}
            >
              Add Customer
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.surname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">{row.active ? "No" : "Yes"}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Update" aria-label="update">
                    <IconButton aria-label="update">
                      <Update
                        color="secondary"
                        onClick={() => handleOpen(row)}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                      <DeleteIcon color="secondary" 
                      onClick={() => openDeleteCustomerModal(row.id)}/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      {/* </Grid> */}
    </Grid>
  );
}

export default Customers;
