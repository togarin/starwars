import React, { useState, useEffect } from "react";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";
import { catchMessages } from "../utils";

const VehicleSpecification = ({ apiVehicleUrl, onSetErrorMessage }) => {
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${apiVehicleUrl}`);
        const starShip = response.data;
        setVehicle(starShip);
        onSetErrorMessage("Верный запрос");
      } catch (error) {
        catchMessages(error, onSetErrorMessage);
      }
    };
    fetchVehicles();
  }, [apiVehicleUrl, onSetErrorMessage]);

  if (!vehicle) return null;

  return (
    <List>
      <ListItem>
        <ListItemText>Марка: {vehicle.name}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>Модель: {vehicle.model}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>Производитель: {vehicle.manufacturer}</ListItemText>
      </ListItem>
      <Divider />
    </List>
  );
};
export default VehicleSpecification;
