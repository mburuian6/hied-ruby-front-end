import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { isLoggedIn, persistedState } from "../helpers";
import { Headroom } from "react-headroom";

const Header = () => {
  const HasLoggedIn = () => {
    return (
      <>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            Logged in:
            <Link to="" variant="body2">
              {persistedState("username")}
            </Link>
          </Grid>
        </Grid>
      </>
    );
  };

  const HasNotLoggedIn = () => {
    return (
      <>
        <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Link to="/signup" variant="body2">
            Sign Up
          </Link>
        </Grid>
        {"  "}
        <Grid item>
          <Link to="/login" variant="body2">
            Login
          </Link>
        </Grid>
      </Grid>

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
    <>

      <Grid container>
      <Grid item>

      <Link to="/">
      <header>
      <Typography variant="h3" color="black">
      Hi'ed
      </Typography>
      </header>
      </Link>

      </Grid>
      </Grid>
      <AppHeader /> 
    </>
  );
};

export default Header;
