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
  const postHashId = job.hash_id;
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const acceptBid = async (bid) => {
    console.log(bid); //post_id, bid_id
    //const bidId = bid._links.self.href.split('/').at(-1); // TODO: Change this to use markers
    const bidHashId = bid.hash_id;

    await axios.put(API_ACCEPT_BID_PATH, 
      {
        post_hash_id: postHashId,
        bid_hash_id: bidHashId
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

  const getBids = () => {
    axios.get(API_POST_BIDS_PATH,{
      params: {
        post_hash_id: postHashId
      }
    })
    .then((response) => {
      if(response.data._embedded != undefined) {
        setBids(response.data._embedded.bids?.reverse());
      }
      streamFromBidsChannel();
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
    // setAdded(true);
  }

  const handleNewBid = (bid) => {
    bids.push(bid)
  }

  const streamFromBidsChannel = () => {
    const cable = ActionCable.createConsumer('ws://localhost:8080/cable');
    const sub = cable.subscriptions.create('BidsChannel', {
      received: handleNewBid()
    })
  }

  //Send to cable channel
  // this.sub.send({ text: e.target.value, id: 1 })

  useEffect (() => {
    getBids();
    setAdded(false);
  }, [added])

  // useEffect(() => {
  //   return () => {
  //     cable.disconnect()
  //   }
  // },[])

  return(
    <div> 
      {/* bid form */}
      <BidForm addBid = { addBid } postHashId={ postHashId }/>

      {/* list */}
      {bids.map((bid,index) => ( 
        <BidItem key={index} bid={bid} acceptBid={acceptBid}/>
      ))}
    </div>
  )
}

export default BidList;





