import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import {timeFormat, timeFormatHuman, timeFormatWithTimeZone} from '../helpers';
import {Breadcrumbs, Button, Link, Stack, Typography} from '@mui/material';
import BidList from '../BidList/BidList';
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";


const JobView = (props) => {

  const { jobId } = useParams();
  const location = useLocation();
  const [job, setJob] = useState(location.state.job);

  const NoMoreInfo = () => {
    return (
      <Typography variant={"caption"} color={"text.secondary"} >
        No more info right now.
      </Typography>
    )
  }

  return( 
    <>
      <Stack spacing={2}>
      <Breadcrumbs separator="›">
        <Link href={'/'}>Home</Link>
        <Typography>{job.title}</Typography>
      </Breadcrumbs>

      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
            posted {timeFormatHuman(job.created_at)} >> <Link>{job.username}</Link>
          </Typography>
          <Typography variant="h5" component="div">
            {job.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Start: {timeFormat(job.start)}
          </Typography>
          <Typography variant="body2">
            {job.description? job.description : <NoMoreInfo/>}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6"> Do you want to bid? </Typography>
      
      {/* all bids */}
      <BidList job={job} />
      </Stack>
    </>
  );
}

export default JobView;



