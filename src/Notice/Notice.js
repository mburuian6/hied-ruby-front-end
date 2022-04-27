import React from 'react';
import {makeStyles} from "@mui/styles";
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from 'npm install /content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Card from "@mui/material/Card";
import cx from 'clsx';
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 343,
    borderRadius: 20,
  },
  content: {
    padding: 24,
  },
}));

export const Notice = React.memo(({notice}) => {
  const styles = useN03TextInfoContentStyles();
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();
  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <BrandCardHeader
        image={
          'https://pngimage.net/wp-content/uploads/2018/06/react-icon-png-7.png' //some image to go back
        }
        extra={'x minutes ago'}
      />
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={styles}
          overline={'Some event'}
          heading={'Header'}
          body={
            'Long message.'
          }
        />
      </CardContent>
    </Card>
  );
});

export default Notice