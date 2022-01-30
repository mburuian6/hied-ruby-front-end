import React, { useEffect, useState } from 'react';
import BidItem from '../BidItem/BidItem';
import { useBidsFetch } from '../hooks/useBidsFetch';
import { API_POST_BIDS_PATH } from "../config";
import BidForm from '../BidForm/BidForm';
import API from '../API';
import useForceUpdate from 'use-force-update';
import { Navigate } from 'react-router-dom';

import { defaultInstance as axios} from '../axiosConfig';
import toast from '../FlashNotification/FlashNotification';

const BidList = ({ job }) => {
 
  // const {state: bids, loading_bids, error_bids } = useBidsFetch( jobId );
  // let _bids = Object.values(bids);
  // const forceUpdate = useForceUpdate();
  
  const acceptBid = async (bid) => {
  //accept bid and 
  // delete all the rest
  //mark post as closed

  // var updateBidUrl = `${BASE_URL}jobs/${jobId}/bids/${bid.id}`;
  // var deleteBidsUrl = `${BASE_URL}jobs/${jobId}/bids/`;
  // var closePostUrl = `${BASE_URL}jobs/${jobId}`;

  var bid_data = {
      pay: bid.pay,
      comment:bid.comment,
      picked: true 
  }

  // var job_data = {
  //     title: job.title,
  //     description: job.description,
  //     pay: job.pay,
  //     start: job.start,
  //     open: false
  // }

  // fetch(closePostUrl,{
  //   method: "PUT",
  //   headers:{'Content-Type': 'application/json'},
  //   body: JSON.stringify(job_data)
  // }).then(() => {
  //   fetch(updateBidUrl,{
  //   method: "PUT",
  //   headers:{'Content-Type': 'application/json'},
  //   body: JSON.stringify(bid_data)
  //   })
  // }).then(() => {
  //   _bids.filter(b => {
  //     return b.id != bid.id
  //   }).map(b => {
  //     fetch(deleteBidsUrl+`${b.id}`,
  //     {method: 'DELETE'})
  //   })
  // }).then(() => {
  //   sessionStorage.removeItem(jobId);
  //   return(
  //     <Navigate to="/notice-board" />
  //   )
  // })

  }


  const[bids, setBids] = useState([]);
  const postId = job._links.self.href.split('/').at(-1);
  const [added, setAdded] = useState(false);

  useEffect (() => {
    getBids();
    setAdded(false);
  }, [added])

  const getBids = () => {
    axios.get(API_POST_BIDS_PATH,{
      params: {
        post_id: postId
      }
    })
    .then((response) => {
        if(response.data._embedded != undefined) {
          setBids(response.data._embedded.bids?.reverse());
        }
      })
    .catch((error) => {
        console.log(error);
        if(error.toString().search('ERR_CONNECTION_REFUSED')){
          toast.error("Error! Check your internet connection and retry.")
        }
        else{
          toast.error("Error! Contact Admin.")
        }
      })
    }

  const addBid = ( response ) => {
    console.log(`add bid method: ${response}`);
    setAdded(true);
  }

  
  return(
    <div> 
      {/* bid form */}
      <BidForm addBid = { addBid } postId={ postId }/>

      {/* list */}
      {bids.map((bid,index) => ( 
        <BidItem key={index} bid={bid} acceptBid={acceptBid}/>
      ))}
    </div>
  )
}

export default BidList;





