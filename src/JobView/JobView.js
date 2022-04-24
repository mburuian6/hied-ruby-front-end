import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { timeFormat } from '../helpers';
import { Typography } from '@mui/material';
import BidList from '../BidList/BidList';


const JobView = (props) => {

  const { jobId } = useParams();
  const location = useLocation();
  const [job, setjob] = useState(location.state.job);
  console.log(job);
  return( 
    <>
      <BreadCrumb jobTitle={job.title}/>
      <p>Job Title: {job.title}</p>
      <p>Pay: {job.pay}</p>
      <p>Start: {new Date(job.start).toLocaleString() }</p>
      <p>Status: { job.closed == false? 'Open': 'Closed'}</p>
      <h5>Job Description:</h5> <p>{job.description}</p>

      <Typography variant="h6"> Do you want to bid? </Typography>
      
      {/* all bids */}
      <BidList job={job} />

    </>
  );
}

export default JobView;



