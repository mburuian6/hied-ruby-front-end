import React, { useState } from "react";
import { Snackbar } from '@mui/material';
import { API_BIDS_PATH } from "../config";
import { Button, TextField } from "@mui/material";
import { defaultInstance as axios } from "../axiosConfig";
import {isPersistedState, persistedState} from "../helpers";
import toast from '../FlashNotification/FlashNotification';


const BidForm = ({ addBid, postId }) => {
    const [pay, setPay] = useState(0);
    const [notes, setNotes] = useState("");
    // const [myBid, setMyBid] = useState();
    
    const handleSubmit = (e) => {
      e.preventDefault();
      formSubmit(e.target);
        
    }

    const formSubmit = async (formData) => {
      var data = new FormData(formData);
      var username = persistedState("username").replaceAll('"','');

      data.append('username', username);
      data.append('post_id', postId);
      console.log(JSON.stringify(Object.fromEntries(data.entries())));

      await axios.post(API_BIDS_PATH, Object.fromEntries(data.entries())
      )
      .then((response)=>{
        setPay(0);
        setNotes('');
        // setMyBid(response.data[0])
        handleSnackBar(); 

        addBid(response.data)
      })
      .catch((error) => {
        console.log(error.toJSON());
        if (error.toJSON().status == 500) {
          toast.warning("Server Error.");
        }
      })
      
    }

    const handleSnackBar = () => {
      return(
        <Snackbar
          autoHideDuration={5000}
          onClose={handleClose}
          message="New Bid Added;"
        />
      )
    }
  
    const handleClose=() => {
  
    }

    return(
        <form onSubmit={e => {handleSubmit(e)}}>
          
          <TextField id="pay" label="Proposed Pay" min="0"
            variant="outlined" type="number" value={pay}
            name="pay" onChange={e => {
              setPay(e.target.value)
            }} required
          /> <br />

          <TextField id="notes" label="Any Notes?" multiline
           variant="outlined" type="text" value={notes} 
           placeholder="Any additional info..." name="notes" 
           onChange={e => setNotes(e.target.value)} maxLength='255'/><br />

          <Button variant="contained"
            color="primary" type="submit">
            Submit Bid
          </Button>
        </form>
    )

}


export default BidForm;










