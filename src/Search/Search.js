import React, {useEffect, useRef, useState} from "react";
import {defaultInstance as axios} from "../axiosConfig";
import SearchBar from "./SearchBar";
import {Grid} from "@mui/material";
import JobItem from "../JobItem/JobItem";

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
    // TODO: send request to back-end here
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