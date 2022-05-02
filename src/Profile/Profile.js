import React, {useEffect, useState} from "react";
import {defaultInstance as axios} from "../axiosConfig";
import {API_GET_USER_PATH} from "../config";
import {persistedState, timeFormatHuman} from "../helpers";
import toast from '../FlashNotification/FlashNotification';
import {Button, Divider, Grid, Stack, TextField} from "@mui/material";
import {useParams} from "react-router-dom";

const Profile = () => {
  let [user, setUser] = useState();
  let [loading, setLoading] = useState(true);
  let username = useParams();

  let getProfile = () => {
    axios.get(API_GET_USER_PATH,{
      params: {
        username: username.toString()
      }
    }).then((response) => {
      let response_item = response.data;
      setUser(response_item["_embedded"]["user"]);
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
            value={user.username}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Joined"
            variant="filled"
            type="text"
            value={timeFormatHuman(user.created_at)}
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
            value={user.email}
            disabled={true}
          />
        </Grid>
      </Stack>
    </form>
  );

}

export default Profile;