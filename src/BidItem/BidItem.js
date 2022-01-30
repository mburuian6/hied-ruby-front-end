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
        {bid.notes? '  User says: '+bid.notes: ''}
      </Typography>
      
      
    </>
  );
}

export default BidItem;









