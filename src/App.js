import React from "react";
import {
  Container,
} from "@material-ui/core";
import Persons from "./Components/Persons"
import "./App.css";

function App() {

  return (
    <React.Fragment>
      <Container maxWidth="lg">
      <Persons/>
      </Container>
    </React.Fragment>
  );
}


export default App;
