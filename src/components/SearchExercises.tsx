"use client";
import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { fetchData, exerciseOptions } from '@/utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

interface SearchExercisesProps {
  setExercises: (exercises: any[]) => void;
  bodyPart: string;
  setBodyPart: (bodyPart: string) => void;
}

const SearchExercises: React.FC<SearchExercisesProps> = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [BodyParts, setBodyParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      console.log(exerciseData);

      const searchedExercises = exerciseData.filter(
        (exercise: any) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );

      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="50px" textAlign="center" mt="200px">
        Start your workout <br />
        follow our exercises
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '1170px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="search Exercises"
          type="text"
        />
         <Button
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            fontWeight: 'bold',
            py: 2,
            px: 4,
            transition: 'all 0.4s',
            boxShadow: 'lg',
            border: '2px solid transparent',
            height: '56px',
            '&:hover': {
              backgroundColor: 'white',
              color: 'black',
              borderColor: 'secondary.main',
              boxShadow: 'xl',
            },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar data={BodyParts}  setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
