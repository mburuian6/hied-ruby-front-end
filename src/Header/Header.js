import React from "react";
import {
  AppBar, Avatar, Badge,
  Box,
  Button, Divider, MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { isLoggedIn, persistedState } from "../helpers";
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [badgeContent, setBadgeContent] = React.useState(20);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const HasLoggedIn = () => {
    return (
      <>
        {/*<Button color="inherit">*/}
        {/*  {persistedState("username").charAt(0)}*/}
        {/*</Button>*/}

        <div>
          <Badge
            badgeContent={badgeContent}
            color="secondary"
            max={10}
            sx={{ width: 30, height: 30 }}
            variant={'dot'}
          >
            <MailIcon />
          </Badge>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              sx={{ width: 30, height: 30 }}
              alt="User">
              {persistedState("username").charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>{persistedState("username")}</MenuItem>
            <Divider/>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      </>
    );
  };

  const HasNotLoggedIn = () => {
    return (
      <>
        <Button color="inherit" href={'/login'}>Login</Button>
        <Button color="inherit" href={'/signup'}>Sign Up</Button>
      </>
    );
  };

  const AppHeader = () => {
    if (isLoggedIn()) {
      return <HasLoggedIn />;
    }
    return <HasNotLoggedIn />;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href={'/'}
          >
            <AccountBalanceIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hi'ed
          </Typography>
          <AppHeader />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
