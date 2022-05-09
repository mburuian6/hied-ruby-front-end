import React, {useEffect, useState} from "react";
import {defaultInstance as axios} from "../axiosConfig";
import {API_GET_USER_PATH} from "../paths-config";
import {persistedState, timeFormatHuman} from "../helpers";
import toast from '../FlashNotification/FlashNotification';
import {Button, Divider, Grid, Stack, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {titleCase} from "../notice_helpers";

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
    <Stack >
      <Typography variant="h3" color={'text.secondary'} >{titleCase(username)}</Typography>
      <Typography variant={"subtitle1"} color={'text.secondary'}>
        Joined {createdAt? timeFormatHuman(createdAt):'unaivailable'}
      </Typography>
      <Divider/>
      <Typography variant={'h5'}>Contact</Typography>
      <form onSubmit={() => {
      }} id="user_profile_form" autoComplete="off">

        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            variant="filled"
            type="text"
            value={email}
            disabled={true}
          />
        </Grid>

      </form>
    </Stack>
  );

}

export default Profile;