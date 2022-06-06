import React, {useEffect, useRef, useState} from "react";
import {
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  MenuItem,
  Stack,
  TextField,
  Autocomplete
} from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_JOBS_PATH } from "../paths-config";
import {persistedState} from "../helpers";
import { defaultInstance as axios } from "../axiosConfig";
import toast from "../FlashNotification/FlashNotification";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {AddPhotoAlternate} from "@mui/icons-material";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
// eslint-disable-line

mapboxgl.accessToken = '';

const locations = [
  {
    value: 'virtual',
    label: 'Virtual',
  },
  {
    value: 'physical',
    label: 'Physical',
  }
];

const JobForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [pay, setPay] = useState(0);
  const [start, setStart] = useState(new Date());
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("virtual");
  const [showmap,setShowmap] = useState('none');
  const [postTags, setPostTags] = useState([]);
  // const [error, setError] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState('36.8246');
  const [lat, setLat] = useState('-1.2890');
  const [zoom, setZoom] = useState(9);
  const marker = useRef(null);

  const myTheme = createTheme({ });

  Object.assign(myTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          marginTop: 20,
          width: "80%",
        },
        editor: {
          // borderBottom: "1px solid gray"
        }
      }
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    formSubmit(event.target);
  };

  const formSubmit = async (formData) => {
    var data = new FormData(formData);

    let title = data.get("title");
    if (!title || title===""){
      toast.error("Title cannot be empty");
      return;
    }

    let pay = data.get("pay");
    if (pay < 0) {
      toast.error("Pay must be equal to or greater than zero");
      return;
    }

    var username = persistedState("username");
    data.append("username", username);
    // console.log("IMAGES: ",files);
    // data.append('images', files);
    data.set("start", start.toUTCString());
    var _tags = postTags.map(v => v.text)
    data.append('tags', _tags);
    data.append('description', description);

    var location = data.get('location')
    if (location==='physical'){
      data.append('latitude', lat.toString());
      data.append('longitude', lng.toString());
    }

    console.log(JSON.stringify(Object.fromEntries(data.entries())));

    await axios
      .post(API_JOBS_PATH, Object.fromEntries(data.entries()))
      .then(() => {
        setTitle("");
        setPay(0.0);
        setStart(new Date());
        setDescription("");

        navigate("/");
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePayChange = (event) => {
    console.log(event.target.value);
    setPay(event.target.value);
  };

  const handleStartChange = (event) => {
    setStart(event);
  };

  const handleDescriptionChange = (state: EditorState) => {
    // Get current selection
    // console.log(state.getSelection())
    // Get current content
    console.log(JSON.stringify(convertToRaw(state.getCurrentContent())))
    setDescription(JSON.stringify(convertToRaw(state.getCurrentContent())))
    // Get current text
    // console.log(state.getCurrentContent().getPlainText())
    // Check if editor is empty
    // if (!state.getCurrentContent().hasText()) {
    //   console.log("empty")
    // }
  };

  const handleImageChange = (event) => {
    if(files.length >= 3)files.pop();
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    if (event.target.value === 'physical') {
      setShowmap('block');
    } else {
      setShowmap('none')
    }
  };

  const handleTagsChange = (event, value) => {
    console.log(value)
    setPostTags(value)
    // postTags.push(value);
    // console.log(postTags)
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [parseFloat(lng), parseFloat(lat)],
      zoom: zoom
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'top-left');
    marker.current = new mapboxgl.Marker().setLngLat([parseFloat(lng), parseFloat(lat)]).addTo(map.current);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      marker.current.setLngLat([parseFloat(lng), parseFloat(lat)]);
    });
  });

  return (
    <Stack spacing={2}>
    <form onSubmit={handleSubmit} id="job_entry_form" autoComplete="off">
      <Stack spacing={3}>{/*  <Grid container columnSpacing={2}>  */}
        <Grid item xs={12} sm={4}>
          <TextField
            id="title"
            label="Title"
            variant="filled"
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="pay"
            label="Pay"
            variant="filled"
            type="number"
            value={pay}
            name="pay"
            onChange={handlePayChange}
            required
          />
        </Grid>
        <Divider/>

        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              id="start"
              label="Start"
              value={start}
              name="start"
              onChange={handleStartChange}
              disablePast={true}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={4} sx={{ maxWidth: 500 }}>
          <Autocomplete
            multiple
            id="tags-standard"
            name='tags'
            options={tags}
            onChange={handleTagsChange}
            filterSelectedOptions
            getOptionLabel={(option) => option.text}
            // defaultValue={[tags[0]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Optional Tags..."
              />
            )}
          />
        </Grid>

        {/*<Grid item xs={12} sm={12} >*/}
        {/*  <TextField*/}
        {/*    id="description"*/}
        {/*    label="Description"*/}
        {/*    variant="filled"*/}
        {/*    type="text"*/}
        {/*    placeholder="..."*/}
        {/*    multiline*/}
        {/*    style={{ backgroundColor: " white", color: " white" }}*/}
        {/*    value={description}*/}
        {/*    name="description"*/}
        {/*    rows={4}*/}
        {/*    onChange={handleDescriptionChange}*/}
        {/*    sx={{ minWidth: 500 }}*/}
        {/*  />*/}
        {/*</Grid>*/}

        <Grid item xs={12} sm={12} sx={{height:200}}>
          <ThemeProvider theme={myTheme}>
            <MUIRichTextEditor
              label="Type something here..."
              inlineToolbar={true}
              controls={['bold', 'italic',"underline", "strikethrough", "highlight", "undo", "redo",
                "link", "numberList", "bulletList", "quote", "code"]}
              onChange={handleDescriptionChange}
            />
          </ThemeProvider>
        </Grid>
        <Divider/>

          <TextField
            id="location"
            label="Location"
            variant="filled"
            type="text"
            value={location}
            placeholder="where is it?"
            name="location"
            onChange={handleLocationChange}
            required
            select
            // helperText="Please select your currency"
          >
            {locations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Stack sx={{display: showmap, minWidth: 100+'%'}} >
          <div ref={mapContainer} className="map-container" style={{minWidth:90+'%'}}/>
          <div className="sidebar"> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} </div>
        </Stack>

        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" type="submit">
            {" "}
            Post Job{" "}
          </Button>
        </Grid>
      </Stack>{/* </Grid> */}
    </form>
      <div>
        <div><p>Please center the location</p></div>
        <div ref={mapContainer} className="map-container" />
        <div className="sidebar"> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} </div>
      </div>

    </Stack>
  );
};

const tags = [
  {text: 'virtual'},
  {text: 'physical'}
]

export default JobForm;
