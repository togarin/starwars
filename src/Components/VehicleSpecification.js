import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";
import {catchMessages} from '../utils'
/*

{
    cargo_capacity: "4"
    consumables: "1 day"
    cost_in_credits: "8000"
    created: "2014-12-18T11:20:04.625000Z"
    crew: "1"
    edited: "2014-12-20T21:30:21.693000Z"
    films: ["http://swapi.dev/api/films/3/"]
    length: "3"
    manufacturer: "Aratech Repulsor Company"
    max_atmosphering_speed: "360"
    model: "74-Z speeder bike"
    name: "Imperial Speeder Bike"
    passengers: "1"
    pilots: (2) ["http://swapi.dev/api/people/1/", "http://swapi.dev/api/people/5/"]
    url: "http://swapi.dev/api/vehicles/30/"
    vehicle_class: "speeder"
}

*/

const VehicleSpecification = ({ apiVehicleUrl, onSetErrorMessage }) => {
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${apiVehicleUrl}`);
        const starShip = response.data;
        setVehicle(starShip);
        console.log(starShip);
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
        <ListItemText>{vehicle.name}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>{vehicle.model}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>{vehicle.manufacturer}</ListItemText>
      </ListItem>

    </List>
  );
};
export default VehicleSpecification;
