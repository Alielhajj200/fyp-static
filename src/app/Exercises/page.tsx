"use client"
import React from 'react'
import {Box} from '@mui/material'
import HeroBanner from '@/components/HeroBanner'
import SearchExercises from '@/components/SearchExercises'
import Exercise from '@/components/Exercise'
import { useState } from 'react'
const Exercises = () => {
  const [exercises,setExercises] = useState([])
  const [bodyPart, setBodyPart] = useState('all')
  return (
    <Box>
      <HeroBanner/>
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
      <Exercise  setExercises={setExercises} bodyPart={bodyPart} exercises={exercises}/>
    </Box>
  )
}

export default Exercises
