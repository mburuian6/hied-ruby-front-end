import React, {useEffect, useState} from "react";
import {defaultInstance as axios} from "../axiosConfig";
import {API_GET_USER_PATH} from "../config";
import toast from "../FlashNotification/FlashNotification";
import {Tabs, Box, Tab, Skeleton, Stack, List} from "@mui/material";
import {TabPanel} from "@mui/lab";
import JobStat from "./Statistics/JobStat";
import AcceptedBidStat from "./Statistics/AcceptedBidStat";
import RejectedBidStat from "./Statistics/RejectedBidStat";


const Statistics = ({ username }) => {
  const [jobs, setJobs] = useState([]);
  const [acceptedBids, setAcceptedBids] = useState([]);
  const [rejectedBids, setRejectedBids] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    getStatistics();
  },[]);

  const getStatistics = () => {
    axios.get(API_STATS_USER_PATH,{
      params: {
        username: username.toString()
      }
    }).then((response) => {
      if(response.data.statistics !== undefined) {
        setJobs(response.data.statistics.posts);
        setAcceptedBids(response.data.statistics.accepted_bids);
        setRejectedBids(response.data.statistics.rejected_bids)
      }
    }).catch((error)=>{
      console.log(error);
      toast.error('Error getting stats.')
    })
  };

  const SkeletonStructure = () => {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    )
  }

  const JobStats = ({}) => {
    if (jobs) {
       return (<SkeletonStructure />);
    }
    return (jobs.map((job,index) => (
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <JobStat key={index} job={job} />
      </List>
    )))
  };

  const AcceptedBidStats = ({}) => {
    if (jobs) {
      return (<SkeletonStructure />);
    }
    return (acceptedBids.map((acceptedBid,index) => (
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <AcceptedBidStat key={index} acceptedBid={acceptedBid} />
      </List>
    )))
  };

  const RejectedBidStats = ({}) => {
    if (jobs) {
      return (<SkeletonStructure />);
    }
    return (rejectedBids.map((rejectedBid,index) => (
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <RejectedBidStat key={index} rejectedBid={rejectedBid} />
      </List>
    )))
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Accepted Bids" {...a11yProps(0)} />
          <Tab label="Rejected Bids" {...a11yProps(0)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <JobStats />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AcceptedBidStats />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RejectedBidStats />
      </TabPanel>
    </Box>
  );

}

export default Statistics;