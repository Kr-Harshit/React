import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    border: "none",
  },
  tableContainer:{
      boxShadow:"none"
  },
});

export default function OrderTimeTable(props) {
  const classes = useStyles();
  const onChangeHandler = (event, interval, session ) => {
    // console.log(event.target.value, interval, session);
    props.changeOrderTime(event.target.value, interval, session);
  }

  return (
    <TableContainer component={Paper}  className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell style={{borderBottom:"none"}}>{''}</TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>Breakfast</TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>Lunch</TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>HighTea</TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>Dinner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" style={{borderBottom:"none", fontWeight:"bold"}}>
              <p>Order From</p>
            </TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>
              <input
                type="time"
                name="'breakfast-from"
                onChange={(event) => onChangeHandler(event, 'breakfast', 'from')}
                value={props.data.breakfast.from}
              />
            </TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>
              <input
                type="time"
                value={props.data.lunch.from}
                onChange={(event) => onChangeHandler(event, 'lunch', 'from')}
                name="'lunch-from"
              />
            </TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>
              <input
                type="time"
                value={props.data.hightea.from}
                name="hightea-from"
                onChange={(event) => onChangeHandler(event, 'hightea', 'from')}
              />
            </TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>
              <input
                type="time"
                value={props.data.dinner.from}
                name="'dinner-from"
                onChange={(event) => onChangeHandler(event, 'dinner', 'from')}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" style={{borderBottom:"none", fontWeight:"bold"}}>
              <p>Order From</p>
            </TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>
              <input
                type="time"
                value={props.data.breakfast.to}
                name="'breakfast-to"
                onChange={(event) => onChangeHandler(event, 'breakfast', 'to')}
              />
            </TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>
              <input
                type="time"
                value={props.data.lunch.to}
                name="'lunch-to"
                onChange={(event) => onChangeHandler(event, 'lunch', 'to')}
              />
            </TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>
              <input
                type="time"
                value={props.data.hightea.to}
                name="hightea-to"
                onChange={(event) => onChangeHandler(event, 'hightea', 'to')}
              />
            </TableCell>
            <TableCell align="center" style={{borderBottom:"none", fontWeight:"bold"}}>
              <input
                type="time"
                value={props.data.dinner.to}
                name="'dinner-to"
                onChange={(event) => onChangeHandler(event, 'dinner', 'to')}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
