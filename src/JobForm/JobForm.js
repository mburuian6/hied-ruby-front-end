import React, { useState } from "react";
import { Divider, Grid, Stack, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_JOBS_PATH } from "../config";
import {persistedState} from "../helpers";
import { defaultInstance as axios } from "../axiosConfig";
import toast from "../FlashNotification/FlashNotification";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {isToday} from "date-fns";

const JobForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [pay, setPay] = useState(0);
  const [start, setStart] = useState(new Date());
  const [description, setDescription] = useState("");
  // const [error, setError] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();
    formSubmit(event.target);
  };

  const formSubmit = async (formData) => {
    var data = new FormData(formData);

    var username = persistedState("username");
    data.append("username", username);

    if(!isToday(start)){
      toast.error("Date must not be less than today");
      return;
    }
    data.set("start", start.toUTCString());

    let pay = data.get("pay");
    if (pay < 0) {
      toast.error("Pay must be equal to or greater than zero");
      return;
    }

    console.log(JSON.stringify(Object.fromEntries(data.entries())));

    await axios
      .post(API_JOBS_PATH, Object.fromEntries(data.entries()))
      .then(() => {
        setTitle("");
        setPay(0.0);
        setStart(new Date());
        setDescription("");

        navigate("/");
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePayChange = (event) => {
    console.log(event.target.value);
    // if(event.target.value < 0){
    //   setError(false);
    //   return;
    // }
    // setError(true);
    setPay(event.target.value);
  };

  const handleStartChange = (event) => {
    setStart(event);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    // <LocalizationProvider dateAdapter={DateAdapter}>
    <form onSubmit={handleSubmit} id="job_entry_form" autoComplete="off">
      <Stack spacing={3}>{/*  <Grid container columnSpacing={2}>  */}
        <Grid item xs={12} sm={4}>
          <TextField
            id="title"
            label="Title"
            variant="filled"
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="pay"
            label="Pay"
            variant="filled"
            type="number"
            value={pay}
            name="pay"
            onChange={handlePayChange}
            required
          />
        </Grid>
        <Divider/>

        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              id="start"
              label="Start"
              value={start}
              name="start"
              onChange={handleStartChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {/* <TextField
            id="start"
            label="Start"
            variant="filled"
            type="datetime-local"
            value={start}
            name="start"
            onChange={handleStartChange}
            required
          /> */}
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            label="Description"
            variant="filled"
            type="text"
            placeholder="..."
            multiline
            style={{ backgroundColor: " white", color: " white" }}
            value={description}
            name="description"
            onChange={handleDescriptionChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" type="submit">
            {" "}
            Post Job{" "}
          </Button>
        </Grid>
      </Stack>{/* </Grid> */}
    </form>
    // </LocalizationProvider>
  );
};

export default JobForm;
