import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { API_JOBS_PATH } from "../config";
import { isPersistedState } from "../helpers";
import { defaultInstance as axios } from "../axiosConfig";
import toast from "../FlashNotification/FlashNotification";

const useStyles = makeStyles({
  root: {
    height: "auto",
    padding: "2em",
    margin: "1em",
    width: "100%",
  },
});

const JobForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [pay, setPay] = useState(0);
  const [start, setStart] = useState(Date.now);
  const [closed, setClosed] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    formSubmit(event.target);
  };

  const formSubmit = async (formData) => {
    var data = new FormData(formData);

    var owner = isPersistedState("email")
      ? isPersistedState("email").replaceAll('"', "")
      : "owner";
    data.append("owner", owner);

    var start = new Date(data.get("start"));
    data.set("start", start.toUTCString());

    var pay = data.get("pay");
    if (pay < 0) {
      toast.error("Pay must be equal to or greater than zero");
      return;
    }

    console.log(JSON.stringify(Object.fromEntries(data.entries())));

    await axios
      .post(API_JOBS_PATH, Object.fromEntries(data.entries()))
      .then(() => {
        setTitle("");
        setPay("");
        setStart("");
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
    setPay(event.target.value);
  };

  const handleStartChange = (event) => {
    setStart(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} id="job_entry_form" autoComplete="off">
      <Grid container columnSpacing={2} >
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
        <Grid item xs={12} sm={4}>
        <TextField
          id="start"
          label="Start"
          variant="filled"
          type="datetime-local"
          value={start}
          name="start"
          onChange={handleStartChange}
          required
        />
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
        <Grid item xs={12} sm={12} >
        <Button variant="contained" color="primary" type="submit">
          {" "}
          Post Job{" "}
        </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default JobForm;
