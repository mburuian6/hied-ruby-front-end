import React from 'react';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
const NoticeItem = ({ notification }) => {

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src='' />
        </ListItemAvatar>
        <ListItemText
          primary="Some Subject"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Some Sender
              </Typography>
              {" — Some ellipsised preview..."}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )

}
export default NoticeItem;

