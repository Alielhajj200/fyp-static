import React from 'react';
import Link from 'next/link';
import { Button, Stack, Typography } from '@mui/material';

interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  bodyPart: string;
  target: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => (
  <Link href={`/exercise/${exercise.id}`} passHref>
    <div className="exercise-card">
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.bodyPart}
        </Button>
        <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.target}
        </Button>
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
        {exercise.name}
      </Typography>
    </div>
  </Link>
);

export default ExerciseCard;
