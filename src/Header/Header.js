import React from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { isLoggedIn, persistedState } from "../helpers";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn());
  const navigate = useNavigate();

  const HasLoggedIn = () => {
    return (
      <>
        <Button color="inherit">
          {persistedState("username").charAt(0)}
        </Button>
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

  // return (
  //   <>
  //
  //     <Grid container>
  //     <Grid item>
  //
  //     <Link to="/">
  //     <header>
  //     <Typography variant="h3" color="black">
  //     Hi'ed
  //     </Typography>
  //     </header>
  //     </Link>
  //
  //     </Grid>
  //     </Grid>
  //     <AppHeader />
  //   </>
  // );

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
