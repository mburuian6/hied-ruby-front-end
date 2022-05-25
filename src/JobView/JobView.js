import React, {useEffect, useRef, useState} from 'react';
import { useParams, useLocation } from 'react-router';
import {timeFormat, timeFormatHuman, timeFormatWithTimeZone} from '../helpers';
import {Breadcrumbs, Button, Link, Stack, Typography} from '@mui/material';
import BidList from '../BidList/BidList';
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import mapboxgl from "mapbox-gl";


const JobView = (props) => {

  const { jobId } = useParams();
  const location = useLocation();
  const [job, setJob] = useState(location.state.job);

  const [lng, setLng] = useState(job.coordinate.longitude);
  const [lat, setLat] = useState(job.coordinate.latitude);
  const [zoom, setZoom] = useState(9);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (job.location !== 'physical') return;
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    const marker = new mapboxgl.Marker().setLngLat([parseFloat(lng), parseFloat(lat)]).addTo(map.current);
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'top-left');
  });

  const NoMoreInfo = () => {
    return (
      <Typography variant={"caption"} color={"text.secondary"} >
        No more info right now.
      </Typography>
    )
  }

  const Map = () => {
    return (
      <div>
        <div ref={mapContainer} className="map-container" />
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
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

        {job.location === 'physical'? < Map /> : null}

      <Typography variant="h6"> Do you want to bid? </Typography>
      
      {/* all bids */}
      <BidList job={job} />
      </Stack>
    </>
  );
}

export default JobView;



