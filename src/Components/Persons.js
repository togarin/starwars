import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import FlightTakeoffOutlinedIcon from "@material-ui/icons/FlightTakeoffOutlined";
import InformationModal from "../Components/InformationModal";
import axios from "axios";
import { catchMessages } from "../utils";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DenseTable = () => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [persons, setPersons] = useState([]);
  const [count, setCount] = useState(1);
  const [ships, setShips] = useState(null);

  const apiUrl = `https://swapi.dev/api/people/?page=`;

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get(apiUrl + `${count}`);
        const newHeros = response.data.results;
        setPersons((persons) => [...persons, ...newHeros]);
        setErrorMessage("Верный запрос");
      } catch (error) {
        catchMessages(error, setErrorMessage);
      }
    };
    fetchPersons();
  }, [count, apiUrl]);

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Hero name</TableCell>
              <TableCell align="right">Birth year</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Vehicles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person, index) => (
              <TableRow key={index}>
                <TableCell align="left">{person.name}</TableCell>
                <TableCell align="right">{person.birth_year}</TableCell>
                <TableCell align="right">{person.gender}</TableCell>
                <TableCell align="right">
                  <IconButton
                    disabled={person.vehicles.length === 0}
                    onClick={() => {
                      setShips(person.vehicles);
                    }}
                  >
                    {" "}
                    <FlightTakeoffOutlinedIcon />{" "}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" onClick={() => setCount(count + 1)}>
        More heros
      </Button>
      {Boolean(ships) && (
        <InformationModal
          vehicles={ships}
          onSetErrorMessage={setErrorMessage}
          isOpen
          onClose={() => {
            setShips(null);
          }}
        />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={errorMessage !== ""}
        autoHideDuration={1000}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
      />
    </React.Fragment>
  );
};

export default DenseTable;
