import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Header = () => {
    return(
        <Link to='/'>
            <header>
            <Typography 
            variant='h3' color="black">
                Hi'ed
            </Typography>
            </header>
        </Link>
    );
  
}

export default Header;







