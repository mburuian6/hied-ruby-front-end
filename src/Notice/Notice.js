import React from 'react';
import {makeStyles} from "@mui/styles";
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from 'npm install /content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Card from "@mui/material/Card";
import cx from 'clsx';
import CardContent from "@mui/material/CardContent";
import {CancelOutlined} from "@mui/icons-material";
import {getLongMessage} from "../notice_helpers";
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
  const styles = useN03TextInfoContentStyles();
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();
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
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <BrandCardHeader
        // image={
        //   'https://pngimage.net/wp-content/uploads/2018/06/react-icon-png-7.png' // TODO: some image to go back
        // }
        extra={ formattedDate }
      />
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={styles}
          overline={_type}
          heading={long_message.subject}
          body={
            long_message.message
          }
        />
      </CardContent>
    </Card>
  );
});

export default Notice