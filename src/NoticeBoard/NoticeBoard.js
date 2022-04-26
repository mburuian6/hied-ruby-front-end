import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { API_ALL_NOTIFICATIONS } from "../config";
import { defaultInstance as axios} from '../axiosConfig';
import toast from '../FlashNotification/FlashNotification';
import 'react-chat-elements/dist/main.css';
import {List} from "@mui/material";
import NoticeItem from "../NoticeItem/NoticeItem";

const NoticeBoard = (  ) => {

  const { username } = useParams();
  const [added, setAdded] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect (() => {
    getNotifications();
  }, [added])
  
  const getNotifications = () => {
    axios.get(API_ALL_NOTIFICATIONS,{
      params: {
        username: username.toString()
      }
    })
    .then((response) => {
      if(response.data._embedded != undefined) {
        setNotifications(response.data._embedded.notifications?.reverse());
      }
    })
    .catch((error) => {
      console.log(error);
      if(error.toString().search('ERR_CONNECTION_REFUSED')){
          toast.error("Error! Check your internet connection and retry.")
      }
      else{
        toast.error("Error! Contact Admin.")
      }
    })
  }

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {notifications.map((notification,index) => (
          <NoticeItem key={index} notification={notification} />
        ))}
      </List>
    </>
  )
}

export default NoticeBoard;
