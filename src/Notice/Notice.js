import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {getLongMessage} from "../notice_helpers";
import {useLocation, useNavigate} from "react-router-dom";
import {timeFormatHuman} from "../helpers";
import {Button, CardActionArea, Typography} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import {defaultInstance as axios} from "../axiosConfig";
import {API_MARK_READ_PATH} from "../paths-config";
import toast from "../FlashNotification/FlashNotification";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 343,
    borderRadius: 20,
  },
  content: {
    padding: 24,
  },
}));

export const Notice = React.memo(({someNullNotification}) => {
  const location = useLocation();

  const [notification, setNotification] = useState(location.state.notification);
  let long_message = getLongMessage(notification);
  let formattedDate = timeFormatHuman(Date.parse(notification.updated_at))
  let _type = notification.notification_type.split('_')
  const navigate = useNavigate();

  useEffect(() => {
    markOpened();
  }, []);

  const markOpened = async () => {
    await axios
      .put(API_MARK_READ_PATH,
        {
          hash_id: notification.hash_id
        })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        toast.error('Error processing notification')
        console.log(error.toJSON());
      });
  }

  return (
    <Card sx={{  }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {long_message.subject}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {long_message.message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">
          #{_type}
        </Button>
        <Button size="small">
          {formattedDate}
        </Button>
        <Button size="small" color="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardActions>
    </Card>
  );
});

export default Notice