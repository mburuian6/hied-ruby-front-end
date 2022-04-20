import React, { useEffect, useState } from 'react';
import BidItem from '../BidItem/BidItem';
import { API_POST_BIDS_PATH, API_ACCEPT_BID_PATH } from "../config";
import BidForm from '../BidForm/BidForm';
import { defaultInstance as axios} from '../axiosConfig';
import toast from '../FlashNotification/FlashNotification';
import { useNavigate } from 'react-router-dom';
import ActionCable from 'actioncable';

const BidList = ({ job }) => {
 
  const[bids, setBids] = useState([]);
  //const postId = job._links.self.href.split('/').at(-1);
  const postId = job.hash_id;
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const acceptBid = async (bid) => {
    console.log(bid); //post_id, bid_id
    //const bidId = bid._links.self.href.split('/').at(-1); // TODO: Change this to use markers
    const bidId = bid.hash_id;

    await axios.put(API_ACCEPT_BID_PATH, 
      {
        post_id: postId,
        bid_id: bidId
      }
    )
    .then((response)=>{
      if (response.status == 200) {
        navigate(`/notice-board/${job.username}`)
      } else {
        toast.error('Failed to accept bid. Try again or contact support')
      }
    })
    .catch((error) => {
      console.log(error.toJSON());
    })
  }

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





