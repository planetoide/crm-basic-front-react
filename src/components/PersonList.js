import React, { useState } from "react";
// import { makeStyles } from '@material-ui/core/styles';
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
import ModalForm from "./ModalForm";
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button'

// Generate Order Data
function createData(id, date, name, surname, email, active) {
  return { id, date, name, surname, email, active };
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
      marginTop: "10px"
  }
}));

export default function PersonList(props) {
  const customers = props.customers;
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectetItem, setSelectedItem] = useState();
  const rows = [];
  customers.map((item) => {
    return rows.push(
      createData(
        item.id,
        "16 Mar, 2019",
        item.name,
        item.surname,
        item.email,
        !item.deleted ? "yes" : "No"
      )
    );
  });

  const handleOpen = (row) => {
    setOpen(true);
    console.table(row);
    setSelectedItem(row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ModalForm formData={selectetItem} typeForm={props.title} manageModal={handleClose}></ModalForm>
    </div>
  );

  return (
    <React.Fragment>
        <Grid container spacing={12} className={classes.title}>
            <Grid item md={9}>

      <Title >{props.title}</Title>
            </Grid>
            <Grid item md={3} alignContent="flex-start">
      <Button variant="contained" size="small" color="secondary" onClick={handleOpen}>
          Agregar {props.title} 
          <AddIcon/>
        </Button>
            </Grid>
        </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Created at</TableCell>
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
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">{row.active}</TableCell>
              <TableCell align="right">
                <Tooltip title="Update" aria-label="update">
                  <IconButton aria-label="delete">
                    <Update
                      color="secondary"
                      onClick={() => handleOpen(row)}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete">
                    <DeleteIcon color="secondary" />
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
    </React.Fragment>
  );
}
