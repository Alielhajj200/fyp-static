import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../../public/gym.png';

interface BodyPartProps {
  item: string;
  setBodyPart: (bodyPart: string) => void;
  bodyPart: string;
}

const BodyPart: React.FC<BodyPartProps> = ({ item, setBodyPart, bodyPart }) => (
  <Stack
    
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    sx={bodyPart === item ? { borderTop: '4px solid #FF2625', background: '#fff', borderBottomLeftRadius: '20px', width: '270px', height: '282px', cursor: 'pointer', gap: '47px' } : { background: '#fff', borderBottomLeftRadius: '20px', width: '270px', height: '282px', cursor: 'pointer', gap: '47px' }}
    onClick={() => {
      setBodyPart(item);
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    }}
  >
    <img src="https://static.vecteezy.com/system/resources/previews/011/299/690/original/gym-and-athletic-building-fitness-centre-3d-icon-illustration-png.png" alt="dumbbell" style={{ width: '60px', height: '60px' }} />
    <Typography fontSize="24px" fontWeight="bold" fontFamily="Alegreya" color="#3A1212" textTransform="capitalize"> {item}</Typography>
  </Stack>
);

export default BodyPart;
