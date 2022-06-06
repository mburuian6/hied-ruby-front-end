import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {timeFormatHuman, timeFormat} from "../helpers";
import {Link} from "react-router-dom";
import {Button, CardHeader} from "@mui/material";
import CardActions from "@mui/material/CardActions";

export default function JobItem({ job }) {

  const NoMoreInfo = () => {
    return (
      <Typography variant={"caption"} color={"text.secondary"} >
        No more info right now.
      </Typography>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {timeFormatHuman(job.created_at)}
        </Typography>
        <Typography variant="h5" component="div">
          <Link to = { '/jobview' } state = {{ job: job }}>{job.title}</Link>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Start: {timeFormat(job.start)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/profile/${job.username}`}>{job.username}</Button>
      </CardActions>
    </Card>
  );
}
