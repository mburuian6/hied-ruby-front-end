import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { API_ALL_NOTIFICATIONS } from "../config";
import { defaultInstance as axios} from '../axiosConfig';
import toast from '../FlashNotification/FlashNotification';
import 'react-chat-elements/dist/main.css';
import { ChatList } from 'react-chat-elements';
import { MessageList } from 'react-chat-elements';
import { SideBar } from 'react-chat-elements';

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
    

    

<SideBar
    top={
        <div>'TOP' area</div>
    }
    center={
      <div>
        <ChatList
          className='chat-list'
          dataSource={[
            {
              avatar: 'https://facebook.github.io/react/img/logo.svg',
              alt: 'Reactjs',
              title: 'Facebook',
              subtitle: 'What are you doing?',
              date: new Date(),
              unread: 0,
            },
      
          ]} />
      </div>
    }
    bottom={
        <div>'BOTTOM' area</div>
    }/>




    </>
  )
}

export default NoticeBoard;
