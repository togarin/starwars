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
  Tooltip,
  Paper,
  IconButton,
} from "@material-ui/core";
import FlightTakeoffOutlinedIcon from "@material-ui/icons/FlightTakeoffOutlined";
import InformationModal from "../Components/InformationModal";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DenseTable = () => {
  const classes = useStyles();
  //   const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [persons, setPersons] = useState([]);
  const [informationModalOpen, setInformationModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [ships, setShips] = useState([]);

  const apiUrl = `https://swapi.dev/api/people/?page=`;

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get(apiUrl + `${count}`);
        const newHeros = response.data.results;
        setPersons((persons) => [...persons, ...newHeros]);
        setErrorMessage("Верный запрос");
      } catch (error) {
        catchMessages(error);
      }
    };
    fetchPersons();
  }, [count]);

  const catchMessages = (error) => {
    if (error.response && error.response.status) {
      if (error.response.status === 500) {
        setErrorMessage("Cерверная ошибка");
      } else if (error.response.status === 404) {
        setErrorMessage("Cущность не найдена в системе");
      } else if (error.response.status === 400) {
        setErrorMessage("Неверный запрос");
      } else if (error.response.status === 200) {
        setErrorMessage("Верный запрос");
      }
    } else setErrorMessage(error.message);
  };

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
            {persons.map((person) => (
              <TableRow key={person.name}>
                <TableCell align="left">{person.name}</TableCell>
                <TableCell align="right">{person.birth_year}</TableCell>
                <TableCell align="right">{person.gender}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Click for more info" placement="bottom-start">
                    <IconButton
                      onClick={() => {
                        setInformationModalOpen(true);
                        setShips(person.vehicles);
                      }}
                    >
                      {" "}
                      <FlightTakeoffOutlinedIcon />{" "}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" onClick={() => setCount(count + 1)}>
        More heros
      </Button>
      <InformationModal
        vehicles={ships}
        isOpen={informationModalOpen}
        onClose={() => {
          setInformationModalOpen(false);
        }}
      />
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
