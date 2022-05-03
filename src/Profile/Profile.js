import React, {useEffect, useState} from "react";
import {defaultInstance as axios} from "../axiosConfig";
import {API_GET_USER_PATH} from "../config";
import {persistedState, timeFormatHuman} from "../helpers";
import toast from '../FlashNotification/FlashNotification';
import {Button, Divider, Grid, Stack, TextField} from "@mui/material";
import {useParams} from "react-router-dom";

const Profile = () => {
  const [createdAt, setCreatedAt] = useState();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const {username} = useParams();

  let getProfile = () => {
    axios.get(API_GET_USER_PATH,{
      params: {
        username: username.toString()
      }
    }).then((response) => {
      if(response.data !== undefined) {
        setCreatedAt(response.data.created_at);
        setEmail(response.data.email);
      }
      setLoading(false);
    }).catch(()=>{
      toast.error('User profile unavailable.')
    })
  };

  useEffect(()=>{
    getProfile();
  },[]);

  return (
    <form onSubmit={()=>{}} id="user_profile_form" autoComplete="off">
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
            label="Email"
            variant="filled"
            type="text"
            value={email}
            disabled={true}
          />
        </Grid>
      </Stack>
    </form>
  );

}

export default Profile;