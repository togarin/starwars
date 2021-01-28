import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import VehicleSpecification from "../Components/VehicleSpecification";

const InformationModal = ({ isOpen, onClose, vehicles, onSetErrorMessage }) => {
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
          {vehicles.map((ship) => (
            <VehicleSpecification
              onSetErrorMessage={onSetErrorMessage}
              apiVehicleUrl={ship}
              key={ship}
              id={ship}
            />
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
