import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useJobFetch } from '../hooks/useJobFetch';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { timeFormat } from '../helpers';
import { Typography } from '@mui/material';
import BidList from '../BidList/BidList';


const JobPost = () => {

  const { jobId } = useParams();
      
  const { state: job, loading, error } = useJobFetch(jobId);
  
  if (error) return <>Something went wrong fetching the Job</>;
  
  return( 
    <>
      <BreadCrumb jobTitle={job.title}/>
      <p>Job Title: {job.title}</p>
      <p>Pay: {job.pay}</p>
      <p>Start: {timeFormat(job.start)}</p>
      <p>Status: { job.open? 'Open': 'Closed'}</p>
      <h5>Job Description:</h5> <p>{job.description}</p>

      <Typography variant="h6"> Do you want to bid? </Typography>
      
      {/* all bids */}
      <BidList jobId={jobId} job={job} />

    </>
  );
}

export default JobPost;



