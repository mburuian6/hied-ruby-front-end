import React, {useEffect, useRef, useState} from "react";
import {defaultInstance as axios} from "../axiosConfig";

const SearchBar = ({ setSearchTerm }) => {

  const [state,setState] = useState('');
  const initial = useRef(true);

  useEffect(() => {
    if(initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500)
  }, [setSearchTerm, state])

  return (
    <input
      type={"text"}
      placeholder={"enter post title or description..."}
      onChange={ event => { setState(event.currentTarget.value)}}
      value={state}
    />
  );

}

export default SearchBar;