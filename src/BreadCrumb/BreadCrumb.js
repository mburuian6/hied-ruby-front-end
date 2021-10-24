import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb=({jobTitle})=> {
  return(
    <>
      <Link to='/'>
          <span>Home</span>
      </Link>
      <span>|</span>
      <span>{jobTitle}</span>
    </>
  );
}

export default BreadCrumb;

