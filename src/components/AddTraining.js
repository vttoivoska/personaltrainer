import React from "react";
import { useState } from "react";
import { Button, TextField, MenuItem, Dialog } from "@material-ui/core/";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import moment from "moment";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: ""
  });

  moment.locale("en-gb");

  const handleClickOpen = () => {
    console.log(props.customer);
    setTraining({ customer: props.customer.links[1].href });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTraining({ date: "", duration: "", activity: "", customer: "" });
  };

  const handleInputChange = event => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const addTraining = () => {
    props.addTraining(training);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        Add training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            type="datetime-local"
            name="date"
            value={training.date}
            onChange={e => handleInputChange(e)}
            label="date"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            type="number"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="duration in minutes"
            fullWidth
          />

          <TextField
            id="select"
            select
            label="activity"
            name="activity"
            margin="dense"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            fullWidth
          >
            <MenuItem value="Jogging">Jogging</MenuItem>
            <MenuItem value="Gym training">Gym training</MenuItem>
            <MenuItem value="Zumba">Zumba </MenuItem>
            <MenuItem value="Fitness">Fitness</MenuItem>
            <MenuItem value="Spinning">Spinning</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}