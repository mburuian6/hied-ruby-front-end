import { Button, TextareaAutosize, TextField } from "@mui/material";
import React, { useState } from "react";
import { Snackbar } from '@mui/material';

const BidForm = ({ url,addBid }) => {
    const [pay, setPay] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        //add to persistent storage
        e.preventDefault();
        formSubmit(e.target);
        setPay(0);
        setComment('');

        handleSnackBar();    
    }

    async function formSubmit(formData) {
      var data = new FormData(formData);
      await fetch(url, {
        method: "POST",
        mode: "cors",
        body: data
      })
      .then(response => {
        response.json();
      })
      .then(response => {
        addBid(response)
      });
    }

    const handleSnackBar = () => {
      return(
        <Snackbar
          
          autoHideDuration={5000}
          onClose={handleClose}
          message="New Bids; Reload Page to View"
        />
      )
    }
  
    const handleClose=() => {
  
    }

    

    return(
        <form onSubmit={e => {handleSubmit(e)}}>
          
          <TextField id="pay" label="Proposed Pay"
            variant="outlined" type="number" value={pay}
            name="pay" onChange={e => setPay(e.target.value)}
          /> <br />

          <TextareaAutosize id="comment" label="Any Comment?"
           variant="outlined" type="text" value={comment} 
           placeholder="Any additional info..." name="comment" 
           onChange={e => setComment(e.target.value)} maxLength='288'/><br />

          <Button variant="contained"
            color="primary" type="submit">
            Submit Bid
          </Button>
        </form>
    )

}


export default BidForm;










