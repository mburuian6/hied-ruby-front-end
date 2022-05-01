import React from 'react';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {getShortMessage} from "../notice_helpers";
import {timeFormat} from "../helpers";

const NoticeItem = React.memo(({ notification }) => {

  const username = notification.username;
  const dateUpdated = new Date(notification.updated_at);
  let message = getShortMessage(notification);

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="User">
            {username.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary= {message.subject}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {timeFormat(dateUpdated)} :
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

