import {Divider, ListItem, ListItemText, Typography} from "@mui/material";
import React from "react";
import {timeFormatWithTimeZone, timeFormatHuman} from "../../helpers";

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
              <Typography variant="caption" display="block">
                [Start: {timeFormatWithTimeZone(job.start)}]
              </Typography>
              <Typography>
                {job.description}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )

}

export default JobStat;