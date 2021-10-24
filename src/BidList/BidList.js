import React, { useEffect, useState } from 'react';
import BidItem from '../BidItem/BidItem';
import { useBidsFetch } from '../hooks/useBidsFetch';
import { BASE_URL } from "../config";
import BidForm from '../BidForm/BidForm';
import API from '../API';
import useForceUpdate from 'use-force-update';
import { Navigate } from 'react-router-dom';

const BidList = ({ jobId, job }) => {
  const api_url = `${BASE_URL}jobs/${jobId}/bids`;
 
  const {state: bids, loading_bids, error_bids } = useBidsFetch( jobId );
  let _bids = Object.values(bids);
  const forceUpdate = useForceUpdate();
  

  const addBid = () => {
    forceUpdate();
  }


  const acceptBid = async (bid) => {
  //accept bid and 
  // delete all the rest
  //mark post as closed

  var updateBidUrl = `${BASE_URL}jobs/${jobId}/bids/${bid.id}`;
  var deleteBidsUrl = `${BASE_URL}jobs/${jobId}/bids/`;
  var closePostUrl = `${BASE_URL}jobs/${jobId}`;

  var bid_data = {
      pay: bid.pay,
      comment:bid.comment,
      picked: true 
  }

  var job_data = {
      title: job.title,
      description: job.description,
      pay: job.pay,
      start: job.start,
      open: false
  }

  fetch(closePostUrl,{
    method: "PUT",
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(job_data)
  }).then(() => {
    fetch(updateBidUrl,{
    method: "PUT",
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(bid_data)
    })
  }).then(() => {
    _bids.filter(b => {
      return b.id != bid.id
    }).map(b => {
      fetch(deleteBidsUrl+`${b.id}`,
      {method: 'DELETE'})
    })
  }).then(() => {
    sessionStorage.removeItem(jobId);
    return(
      <Navigate to="/notice-board" />
    )
  })

  }


  //if error
  if (error_bids) return <>Something went wrong fetching the bids</>;

  //def return
  return(
    <div> 
      {/* bid form */}
      <BidForm url = { api_url }
              addBid = { addBid }/>

    {/* list */}
    {_bids.map((bid) => (
      <BidItem key={bid.id} bid={bid} acceptBid={acceptBid}/>
    ))}
    </div>
  )
}

export default BidList;





