import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import VehicleSpecification from "../Components/VehicleSpecification";

const InformationModal = (props) => {
  const { isOpen, onClose, vehicles, onSetErrorMessage } = props;
  return (
    <>
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
    </>
  );
};

export default InformationModal;
