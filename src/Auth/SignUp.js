import { Avatar, Button, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { API_SIGN_UP_URL,headers } from '../config';
import  { Navigate,useNavigate } from 'react-router-dom';
import validator from 'validator';
import toast from '../FlashNotification/FlashNotification';


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

export default function SignUp() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // email validation
        if(validator.isEmail(data.get('email'))){
            //send the data
            // console.log(JSON.stringify(Object.fromEntries(data.entries())));
            formSubmit(data);
        }
        else {
            toast.warning('Invalid email.')
        }
        
    };

    const formSubmit = async (data) => {
        await fetch(API_SIGN_UP_URL, {
            method: "POST",
            headers: headers,
            mode: "cors",
            body: JSON.stringify(Object.fromEntries(data.entries()))
        })
        .then(response => {
            if(response.ok){
                //show success message
                toast.success('Register successful! Please log in to proceed');
                //reload to login
                navigate('/login')
            }
            else{
                //show error message
                toast.error('Register error, '+new Error(response.body));
            }
        });

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
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form" noValidate
                        onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }}/>
            </Container>
        </ThemeProvider>
    );

}




