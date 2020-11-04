import React, {useState} from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

// Generate Order Data
function createData(id, date, name, surname, email, amount) {
  return { id, date, name, surname, email, amount };
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
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function PersonList(props) {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
  const customers = props.customers;
  const [open, setOpen] = useState(false);
  const rows = [];
  customers.map((item) => {
    return rows.push(
      createData(
        item.id,
        "16 Mar, 2019",
        item.name,
        item.surname,
        item.email,
        312.44
      )
    );
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
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
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">
                <Tooltip title="Add" aria-label="add">
                  <IconButton aria-label="delete">
                  <AddIcon color="secondary" onClick={handleOpen}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete">
                    <DeleteIcon color="secondary"/>
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
