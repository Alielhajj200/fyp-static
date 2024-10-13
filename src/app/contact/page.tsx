"use client"
import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundDiv = styled('div')(({ theme }) => ({
  backgroundImage: 'url(https://images.pexels.com/photos/4164770/pexels-photo-4164770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const AnimatedCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  margin: '0 auto',
  padding: '20px 5px',
  marginBottom: '80px',
  marginTop: '20px',
  backgroundColor: 'transparent',
  borderRadius: 30,
  border: '4px solid white',
  color: 'white',
  opacity: 0,
  transform: 'translateY(50px)',
  transition: 'opacity 1s ease-out, transform 1s ease-out',
  '&.animate': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
    '& input': {
      color: 'white',
    },
    '& textarea': {
      color: 'white',
    }
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: 'white',
  },
};

const Contact = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <BackgroundDiv>
      <AnimatedCard className={animate ? 'animate' : ''}>
        <CardContent>
          <Typography variant='h5' gutterBottom style={{ color: 'white' }}>Contact Us</Typography>
          <Typography gutterBottom variant='body2' component="p" style={{ color: 'white' }}>
            Fill up the form and we will answer you within 24 hours
          </Typography>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField 
                  label="First Name" 
                  placeholder='Enter your First name' 
                  variant='outlined' 
                  fullWidth 
                  required 
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={textFieldStyle}
                />
              </Grid >
              <Grid xs={12} sm={6} item>
                <TextField 
                  label="Last Name" 
                  placeholder='Enter your Last name' 
                  variant='outlined' 
                  fullWidth 
                  required 
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField 
                  type="email" 
                  label="Email" 
                  placeholder='Enter your Email' 
                  variant='outlined' 
                  fullWidth 
                  required 
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField 
                  type="number" 
                  label="Phone" 
                  placeholder='Enter your Phone number' 
                  variant='outlined' 
                  fullWidth 
                  required 
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField 
                  label="Message" 
                  placeholder='Enter your Message' 
                  variant='outlined' 
                  fullWidth 
                  required 
                  multiline 
                  rows={4} 
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid xs={12} item>
                <Button variant='contained' style={{ backgroundColor: '#F9B500', color: 'black' }} fullWidth type='submit'>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </AnimatedCard>
    </BackgroundDiv>
  );
};

export default Contact;
