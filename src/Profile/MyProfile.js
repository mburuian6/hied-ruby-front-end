import React, {useEffect, useState} from "react";
import {defaultInstance as axios} from "../axiosConfig";
import {API_GET_USER_PATH, API_UPDATE_USER_PATH} from "../paths-config";
import {persistedState, timeFormatHuman} from "../helpers";
import toast from '../FlashNotification/FlashNotification';
import {Button, Divider, Grid, Stack, TextField, Typography} from "@mui/material";
import Statistics from "./Statistics";
import {titleCase} from "../notice_helpers";

const MyProfile = () => {
  const [createdAt, setCreatedAt] = useState();
  const [email, setEmail] = useState('');
  // const [loading, setLoading] = useState(false);
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
    // setLoading(true);
    var data = new FormData(event.target);

    var username = persistedState("username");
    data.append("username", username);

    axios
      .put(API_UPDATE_USER_PATH, Object.fromEntries(data.entries()))
      .then(() => {
        toast.info('Saved successfully');
        // setLoading(false);
      })
      .catch((error) => {
        toast.error('Failed to save. Email already used in another profile');
        console.log(error.toJSON());
      });
  }

  return (
    <Stack>
      <Typography variant="h3" >{titleCase(username)}</Typography>
      <Typography variant={"subtitle1"} color={'text.secondary'}>Joined {createdAt? timeFormatHuman(createdAt):'unaivailable'}</Typography>
      <Divider/>
      <Typography variant={'h5'}>Contact</Typography>
      <form onSubmit={handleSubmit} id="user_profile_form" autoComplete="off">
        <Stack spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            type="text"
            value={email}
            name="email"
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" type="submit" disabled={false}>
            {" "}Update Profile{" "}
          </Button>
        </Grid>
        </Stack>
      </form>
      <Statistics username={username}/>
    </Stack>
  );

}

export default MyProfile;