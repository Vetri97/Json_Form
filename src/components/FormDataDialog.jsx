import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const FormDataDialog = ({ formData, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Form Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2" color="textSecondary">
            Name: {formData.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Email: {formData.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Age: {formData.age}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Address 1: {formData.address1}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Address 2: {formData.address2}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            City: {formData.city}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            State: {formData.state}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Country: {formData.country}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Gender: {formData.gender}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Marital Status: {formData.maritalStatus}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDataDialog;
