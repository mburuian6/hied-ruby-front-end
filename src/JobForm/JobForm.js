import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';
import { API_JOBS_PATH } from '../config';
import { isPersistedState } from '../helpers';
import { defaultInstance as axios}  from '../axiosConfig';
import { toast } from '../FlashNotification/FlashNotification';

const useStyles = makeStyles({
    root: {
        height: "auto",
        padding: "2em",
        margin: "1em",
        width: "100%"
    }
});


const JobForm = () => {

    const navigate = useNavigate();

    const [title,setTitle] = useState('');
    const [pay,setPay] = useState(0);
    const [start,setStart] = useState(Date.now);
    const [closed,setClosed] = useState(false);
    const [description,setDescription] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      formSubmit(event.target);
    }

    // const formSubmit = async (formData) => {
    //   var data = new FormData(formData);
    //   var obj = Object.fromEntries(data.entries())
    //   obj['owner'] = isPersistedState('email').replaceAll('"','')
    //   console.log(obj);

    //   console.log(`Bearer ${isPersistedState('authenticationToken')}`);
    //   await fetch(API_JOBS_URL, {
    //     method: "POST",
    //     headers: headers,
    //     mode: "cors",
    //     body: JSON.stringify()
    //   })
    //   .then(response => {
    //       if(response.ok){
    //         setTitle('');
    //         setPay('');
    //         setStart('');
    //         setDescription('');

    //         navigate('/')
    //       } else{
    //           console.log(response.text);
    //       }
    //   })
      
    // }

    const formSubmit = async (formData) => {
      var data = new FormData(formData);

      var owner = isPersistedState('email')?
        isPersistedState('email').replaceAll('"',''): 'owner';
      data.append('owner', owner);

      var start = new Date(data.get('start'));
      data.set('start',start.toUTCString());

      console.log(JSON.stringify(Object.fromEntries(data.entries())));

      await axios.post(API_JOBS_PATH, Object.fromEntries(data.entries())
      )
      .then(()=>{
        setTitle('');
        setPay('');
        setStart('');
        setDescription('');

        navigate('/')
      })
      .catch((error) => {
        console.log(error.toJSON());
      })
      
    }
    
    const handleTitleChange = (event) => {
      setTitle(event.target.value)
    }

    const handlePayChange = (event) => {
      setPay(event.target.value)
    }

    const handleStartChange = (event) => {
      setStart(event.target.value)
    }

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value)
    }


    return (
      <Grid>
        <Grid item xs></Grid>
          <Grid item xs={10}>
            <form onSubmit={handleSubmit}
                  id="job_entry_form"
                  autoComplete="off">

                <TextField id="title" label="Title" 
                variant="filled" type="text" 
                value={title} name="title" 
                onChange={handleTitleChange} required/> <br />

                <TextField id="pay" label="Pay" 
                variant="filled"  type="number" 
                value={pay}  name="pay" 
                onChange={handlePayChange} required/> <br />

                <TextField id="start" label="Start" 
                variant="filled" type="datetime-local" 
                value={start} name="start" 
                onChange={handleStartChange} required/><br />

                <TextField id="description" label="Description" 
                variant="filled" type="text" placeholder='...'
                multiline 
                style={{backgroundColor:" white",color:" white"}}
                value={description} name="description" 
                onChange={handleDescriptionChange} /><br />

                <Button variant="contained" color="primary" 
                type="submit"> Post Job </Button>
                </form>
            </Grid>

            <Grid item xs></Grid>
        </Grid>
    )
}



export default JobForm;

