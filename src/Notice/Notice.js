import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Card from "@mui/material/Card";
import cx from 'clsx';
import CardContent from "@mui/material/CardContent";
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import {CancelOutlined} from "@mui/icons-material";
import {getLongMessage} from "../notice_helpers";
import {useLocation} from "react-router-dom";
import {timeFormatHuman} from "../helpers";

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

  const goBack = () => {
    history.goBack();
    return undefined;
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
        {/*TODO: Go Back*/}
        <Button size="small" color="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardActions>
    </Card>
  );
});

export default Notice