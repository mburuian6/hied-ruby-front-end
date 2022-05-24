import * as React from 'react';
import { Avatar, Button, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography, Checkbox} from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { API_LOGIN_PATH } from '../paths-config';
import  { useNavigate, useLocation } from 'react-router-dom';
import validator from 'validator';
import toast from '../FlashNotification/FlashNotification';
import { authInstance as axios} from '../axiosConfig';

function Copyright(props) {
    return (
        <Typography variant='body2' color='text.secondary' align='center'
            {...props}>
            {'Copyright © '}
            <Link color="inherit" to="#">
                hied
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let password = data.get("password");
    if (!password || password===""){
      toast.error("Password cannot be empty");
      return;
    }

    // email validation
    if(validator.isEmail(data.get('email'))){
        formSubmit(data);
    }
    else {
        toast.warning('Invalid email.')
    }
  };

  const formSubmit = async (formData) => {
    await axios.post(API_LOGIN_PATH, 
        Object.fromEntries(formData.entries())
    )
    .then(()=>{
      navigate(state?.path || "/");
      toast.success('You are successfully logged in');
    })
    .catch((error) => {
      console.log(error);
      toast.error('Login error, '+new Error(error.body));
    })
    
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}