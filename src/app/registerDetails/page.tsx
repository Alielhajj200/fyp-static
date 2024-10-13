'use client'
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// Define the shape of the form data
interface FormData {
  gender: string;
  goal: string;
  bodyWeight: string;
  activityLevel: string;
  age: number;
  weight: number;
  height: number;
}

// Define the custom hook with proper typing
const useGlobalForm = (): [FormData, (key: keyof FormData, value: string | number) => void] => {
  const [formData, setFormData] = useState<FormData>({
    gender: 'male',
    goal: 'lose',
    bodyWeight: 'light',
    activityLevel: 'low',
    age: 50,
    weight: 100,
    height: 180,
  });
  
  const updateFormData = (key: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return [formData, updateFormData];
};

const Register: React.FC = () => {
    const [message, setMessage] = useState("");
    const { onRegister } = useAuth();
  const [formData, updateFormData] = useGlobalForm();
  const email:string|any = sessionStorage.getItem('email');
  const password:string|any = sessionStorage.getItem('password');

  
  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    try{
    const result = await onRegister(email, password,formData.gender,formData.goal,formData.bodyWeight,formData.age,formData.weight,formData.height,formData.activityLevel,formData.height);
    
    alert('user created succesfully!')
    window.location.href="/"
    }catch{
        setMessage('Password minimum character should be 8.');
    }
        
    
  
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-6 lg:px-20 text-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md w-full max-w-4xl p-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Register Details</h2>
          <div className="border-2 w-10 border-secondary inline-block mb-4"></div>
          
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="w-full">
              <label className="block text-left mb-2">Gender</label>
              <select 
                className="w-full p-2 border rounded-lg" 
                value={formData.gender} 
                onChange={(e) => updateFormData('gender', e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="w-full mt-4 sm:mt-0">
              <label className="block text-left mb-2">Goal</label>
              <select 
                className="w-full p-2 border rounded-lg" 
                value={formData.goal} 
                onChange={(e) => updateFormData('goal', e.target.value)}
              >
                <option value="lose">Lose Weight</option>
                <option value="gain_weight">Gain Weight</option>
                <option value="gain_muscles">Gain Muscles</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="w-full">
              <label className="block text-left mb-2">Body Weight</label>
              <select 
                className="w-full p-2 border rounded-lg" 
                value={formData.bodyWeight} 
                onChange={(e) => updateFormData('bodyWeight', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>
            <div className="w-full mt-4 sm:mt-0">
              <label className="block text-left mb-2">Activity Level</label>
              <select 
                className="w-full p-2 border rounded-lg" 
                value={formData.activityLevel} 
                onChange={(e) => updateFormData('activityLevel', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-left mb-2">Age: <span>{formData.age}</span></label>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={formData.age} 
              className="w-full" 
              onChange={(e) => updateFormData('age', Number(e.target.value))} 
            />
          </div>

          <div className="mb-4">
            <label className="block text-left mb-2">Weight (kg): <span>{formData.weight}</span></label>
            <input 
              type="range" 
              min="30" 
              max="300" 
              value={formData.weight} 
              className="w-full" 
              onChange={(e) => updateFormData('weight', Number(e.target.value))} 
            />
          </div>

          <div className="mb-4">
            <label className="block text-left mb-2">Height (cm): <span>{formData.height}</span></label>
            <input 
              type="range" 
              min="110" 
              max="250" 
              value={formData.height} 
              className="w-full" 
              onChange={(e) => updateFormData('height', Number(e.target.value))} 
            />
          </div>

          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg w-full mt-6">
            Register
          </button>
          {message && <p className="text-red-500 mt-3">{message}</p>}
        </form>
      </main>
    </div>
  );
};

export default Register;
