import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        mt: { lg: '12px', xs: '70px' },
        ml: { sm: '150px' },
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative',
        p: '20px',
        
      }}
    >
      <Box flex="1" mt="150px" mr="20px" > 
        <Typography className='text-secondary' fontWeight="600" fontSize="26px">
          Workfit gym
        </Typography>

        <Typography fontWeight={700} sx={{ fontSize: { lg: '54px', xs: '40px' } }} mb="23px" mt="30px">
          Work hard for a fit<br />
          and healthy body
        </Typography>

        <Typography fontSize="22px" lineHeight="35px" mb={3}>
          Checkout the most effective exercises
        </Typography>

        <Button variant='contained' color='primary' href="#exercises">
          Explore Exercise
        </Button>
      </Box>

      <img src="https://images.pexels.com/photos/20418607/pexels-photo-20418607/free-photo-of-man-exercising-at-gym.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hero Banner" className="hero-banner-img" style={{height:750}}/>
    </Box>
  );
};

export default HeroBanner;
