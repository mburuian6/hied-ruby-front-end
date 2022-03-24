import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { isLoggedIn, isPersistedState } from "../helpers";
import { Headroom } from "react-headroom";

const Header = () => {
  const HasLoggedIn = () => {
    return (
      <>
        {/* <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            Logged in:
            <Link to="" variant="body2">
              {isPersistedState("username")}
            </Link>
          </Grid>
        </Grid> */}

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/">
                Logged In: {isPersistedState("username")}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/logout">
                Log out
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  };

  const HasNotLoggedIn = () => {
    return (
      <>
        {/* <Grid container spacing={2} justifyContent="flex-end">
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
      </Grid> */}

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/signup">
                Sign Up
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">
                Login
              </a>
            </li>
          </ul>
        </div>
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
      <nav class="navbar navbar-expand-lg ">
        <div class="container px-5">
          <a class="navbar-brand" href="/">
            <Typography variant="h3" color="blue">
              Hi'ed
            </Typography>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <AppHeader />
        </div>
      </nav>

      {/* <Grid container> */}
      {/* <Grid item> */}

      {/* <Link to="/"> */}
      {/* <header> */}
      {/* <Typography variant="h3" color="black"> */}
      {/* Hi'ed */}
      {/* </Typography> */}
      {/* </header> */}
      {/* </Link> */}

      {/* </Grid> */}
      {/* </Grid> */}
      {/* <AppHeader />  */}
    </>
  );
};

export default Header;
