import React, {useEffect, useRef, useState} from "react";
import {defaultInstance as axios} from "../axiosConfig";
import SearchBar from "./SearchBar";
import {Grid} from "@mui/material";
import JobItem from "../JobItem/JobItem";
import {API_GET_USER_PATH, API_SEARCH_POSTS_PATH} from "../paths-config";
import toast from "../FlashNotification/FlashNotification";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state,setState] = useState([]);

  //initial and search
  useEffect(() => {
    if(!searchTerm){
        return;
      }

    fetchPosts(searchTerm);
  }, [searchTerm]);

  const fetchPosts = async (searchTerm="") => {
    axios.get(API_SEARCH_POSTS_PATH, {
      params: {
        search_term : searchTerm
      }
    })
    .then((response) => {
      var response_items = response.data;
      setState(response_items["_embedded"]["posts"]?.reverse());
    })
    .catch((error) => {
      toast.warning('Your device is offline')
      console.log(error)
    })
  };


  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm? 'Search Results' :'Popular Posts'}>
        {state.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <JobItem
              job={item}
              jobIndex={index}
              jobLink={item['_links']['self']}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );

}

export default Search;