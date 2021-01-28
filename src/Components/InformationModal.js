import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const InformationModal = ({ isOpen, onClose, vehicles }) => {

  console.log(vehicles);

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Specifications of starship"}
        </DialogTitle>
        <DialogContent>
          {vehicles.map((ship, index) => (
          <List component="nav" aria-label="specifications" key={index}>
            <ListItem >
              <ListItemText>{ship} </ListItemText>
            </ListItem>
          </List>

          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default InformationModal;
