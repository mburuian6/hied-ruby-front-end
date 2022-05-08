import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {timeFormatWithTimeZone, timeFormatHuman} from "../helpers";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import CardActions from "@mui/material/CardActions";

export default function JobItem({ job }) {
  return (


        //
        //         by: {<Link to={}></Link>}


    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {timeFormatHuman(job.created_at)}
        </Typography>
        <Typography variant="h5" component="div">
          <Link to = { '/jobview' } state = {{ job: job }}>{job.title}</Link>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {timeFormatWithTimeZone(job.start)}
        </Typography>
        <Typography variant="body2">
          {job.description? job.description.substring(0, 31) : 'No more info right now.'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/profile/${job.username}`}>{job.username}</Button>
      </CardActions>
    </Card>
  );
}
