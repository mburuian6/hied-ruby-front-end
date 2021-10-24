import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

const BidItem = ({ bid, acceptBid }) =>{

  const acceptBidLocal = () =>{
    acceptBid(bid);
  }

  return (
    <>
      <hr/>
      <Typography variant='subtitle2'> Bid by: <i>user</i>
      Pay: {bid.pay} <Button onClick={acceptBidLocal}> Accept </Button>
      </Typography>
      <Typography variant='caption'> {bid.picked? 'Accepted':''} </Typography>
      <Typography variant='caption'>
        {bid.comment? '  User says: '+bid.comment: ''}
      </Typography>
      
      
    </>
  );
}

export default BidItem;









