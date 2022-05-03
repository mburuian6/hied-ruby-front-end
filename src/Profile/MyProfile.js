import React, {useEffect, useState} from "react";
import {defaultInstance as axios} from "../axiosConfig";
import {API_GET_USER_PATH, API_UPDATE_USER_PATH} from "../config";
import {persistedState, timeFormatHuman} from "../helpers";
import toast from '../FlashNotification/FlashNotification';
import {Button, Divider, Grid, Stack, TextField} from "@mui/material";

const MyProfile = () => {
  const [createdAt, setCreatedAt] = useState();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const username = persistedState('username');

  useEffect(()=>{
    getProfile();
  },[]);

  const getProfile = () => {
    axios.get(API_GET_USER_PATH,{
      params: {
        username: username.toString()
      }
    }).then((response) => {
      if(response.data !== undefined) {
        setCreatedAt(response.data.created_at);
        setEmail(response.data.email);
      }
    }).catch((error)=>{
      console.log(error);
      toast.error('User profile unavailable.')
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    var data = new FormData(event.target);
    if(data.get('email') === email){
      toast.info('Email unchanged');
      return;
    }

    var username = persistedState("username");
    data.append("username", username);

    axios
      .put(API_UPDATE_USER_PATH, Object.fromEntries(data.entries()))
      .then(() => {
        toast.info('Saved successfully');
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Failed to save.');
        console.log(error.toJSON());
      });
  }

  return (
    <form onSubmit={handleSubmit} id="user_profile_form" autoComplete="off">
      <Stack spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Username"
            variant="filled"
            type="text"
            value={username}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Joined"
            variant="filled"
            type="text"
            value={createdAt? timeFormatHuman(createdAt): ''}
            disabled={true}
          />
        </Grid>
        <Divider/>
        <h2>Contact</h2>
        <Grid item xs={12} sm={4}>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            type="text"
            value={email}
            name="email"
            onChange={(event)=>{setEmail(event.target.value)}}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {" "}Update Profile{" "}
          </Button>
        </Grid>
      </Stack>
    </form>
  );

}

export default MyProfile;