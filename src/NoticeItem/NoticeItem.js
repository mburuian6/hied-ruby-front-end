import React from 'react';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {getShortMessage} from "../notice_helpers";
import { Link } from 'react-router-dom';
import {timeFormatWithTimeZone} from "../helpers";

const NoticeItem = React.memo(({ notification }) => {

  const username = notification.username;
  const dateUpdated = new Date(notification.updated_at);
  let message = getShortMessage(notification);

  const statusColors = {
    unopened: '#cbcbcb',
    opened: '#FFFFFF'
  }

  return (
    <>
      <ListItem alignItems="flex-start"
                sx={{ backgroundColor: statusColors[notification.notification_opened ?? '#FFFFFF'] }}>
        <ListItemAvatar>
          <Avatar alt="User">
            {username.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary= {<Link to={'/notice'} state = {{ notification:notification }}>{message.subject}
                    </Link> }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {timeFormatWithTimeZone(dateUpdated)} :
              </Typography>
              {message.message}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )

})
export default NoticeItem;

