import {Divider, ListItem, ListItemText, Typography} from "@mui/material";
import React from "react";
import {timeFormat, timeFormatHuman} from "../../helpers";

const JobStat = ({ job }) => {

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={`${job.title} - Kes ${job.pay}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               Created: {timeFormatHuman(job.created_at)}
              </Typography>
              Start: {timeFormat(job.start)} :-
              {job.description}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )

}

export default JobStat;