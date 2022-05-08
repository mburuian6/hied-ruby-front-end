import { Button, Typography } from '@mui/material';
import React from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {persistedState} from "../helpers";

const BidItem = ({ bid, acceptBid }) =>{
  const isOwner = (persistedState('username') === bid.username);

  const acceptBidLocal = () =>{
    acceptBid(bid);
  }

  const WithdrawButton = () => {
    return(<Button size="small"> Withdraw </Button>);
  }

  return (
    <>
      <Card sx={{ height:0.7 }}>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            Kes {bid.pay} by: {bid.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bid.notes? bid.notes: ''}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={acceptBidLocal}> Accept</Button>
          {isOwner? null : <WithdrawButton/> }
        </CardActions>
      </Card>
    </>
  );
}

export default BidItem;









