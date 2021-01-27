import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
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
// import { FlightTakeoffOutlinedIcon, Delete } from "@material-ui/icons";
import FlightTakeoffOutlinedIcon from "@material-ui/icons/FlightTakeoffOutlined";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import InformationModal from "../Components/InformationModal";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const DenseTable = () => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [persons, setPersons] = useState([]);
  const [informationModalOpen, setInformationModalOpen] = useState(false);

  const apiUrl = "https://swapi.dev/api/people/?page=1";

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const result = await axios.get(apiUrl);
        console.log(result.data.results);

        setPersons(result.data.results);
      } catch (error) {
        catchMessages(error);
      }
    };
    fetchPersons();
  }, []);

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
    <div>
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
                    <IconButton onClick={() => setInformationModalOpen(true)}>
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
      <InformationModal
        isOpen={informationModalOpen}
        onClose={() => {
          setInformationModalOpen(false);
        }}
      />
    </div>
  );
};

export default DenseTable;
