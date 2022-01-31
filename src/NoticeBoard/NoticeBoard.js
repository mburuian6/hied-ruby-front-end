import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { API_ALL_NOTIFICATIONS } from "../config";
import { defaultInstance as axios} from '../axiosConfig';
import toast from '../FlashNotification/FlashNotification';

const NoticeBoard = (  ) => {

  const { owner } = useParams();
  const [added, setAdded] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect (() => {
    getNotifications();
  }, [added])
  
  const getNotifications = () => {
    axios.get(API_ALL_NOTIFICATIONS,{
      params: {
        owner: owner.toString()
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
    <p> Notice: </p>
    {notifications.map((notification,index) => ( 
      <>
      <li key={index} notification={notification}>
        notification: {notification.subject} ;{notification.message}
      </li>
      </>
    ))}
    </>
  )
}

export default NoticeBoard;
