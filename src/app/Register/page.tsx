'use client'
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
const TOKEN_KEY = 'abcd123';
export default function Register() {
  const { onCheckRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");








  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setMessage("");
if(password==confirmPassword){
    try {
     const result = await onCheckRegister(email, password);
      console.log(result);

      if(result.available==true){
        sessionStorage.setItem('email', email);
sessionStorage.setItem('password', password);
        window.location.href="/registerDetails"
      }else{
        setMessage("Email already exist ! try another one ");
      }
      
      /*const token = localStorage.getItem(TOKEN_KEY);
      console.log(token);*/
      // Redirect or handle success as needed
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please try again later.");
    }
  }else{
    setMessage("Passwords do not match");
  }

    
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-6 lg:px-20 text-center relative login-item">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl flex flex-col md:flex-row w-full max-w-4xl">
        <div className="bg-white rounded-2xl flex flex-col md:flex-row w-full max-w-4xl">
          <div className="md:w-2/3 p-5">
            <div className="text-left font-bold">
              <span className="text-secondary">Work</span>fit
            </div>
            <div className="py-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Create a new Account</h2>
              <div className="border-2 w-10 border-secondary inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <Link href='/socialLogin' legacyBehavior>
                  <a className="border-2 border-gray-200 rounded-full p-3 mx-1">
                    <FaFacebookF className="text-sm" />
                  </a>
                </Link>
                <Link href='socialLogin' legacyBehavior>
                  <a className="border-2 border-gray-200 rounded-full p-3 mx-1">
                    <FaLinkedinIn className="text-sm" />
                  </a>
                </Link>
                <Link href='socialLogin' legacyBehavior>
                  <a className="border-2 border-gray-200 rounded-full p-3 mx-1">
                    <FaGoogle className="text-sm" />
                  </a>
                </Link>
              </div>
              <p className="text-gray-400 my-3">Create a new account</p>

              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-full max-w-xs p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                <div className="bg-gray-100 w-full max-w-xs p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="bg-gray-100 w-full max-w-xs p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="Confirm Password"
                    placeholder="Confirm Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-between w-full max-w-xs mb-5">
                  <label className="flex items-center text-xs">
                    <input type="checkbox" name="remember" className="mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="text-xs">Forget Password</a>
                </div>
                <button
                  type="submit"
                  className="border-2 border-primary rounded-full px-6 py-2 inline-block font-semibold hover:bg-secondary hover:text-black"
                 
                >
                  Sign in
                </button>
                {message && <p className="text-red-500 mt-3">{message}</p>}
              </div>
            </div>
          </div>
          <div className="md:w-1/3 bg-primary text-white rounded-tr-2xl rounded-br-2xl py-36 px-6 lg:px-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Hello Friends</h2>
            <div className="border-2 w-10 border-secondary inline-block mb-2"></div>
            <p className="mb-10 text-sm sm:text-base">Fill up personal information and start your journey with us.</p>
            <Link href="/login" legacyBehavior>
              <a className="border-2 border-secondary rounded-full px-6 py-2 inline-block font-semibold hover:bg-secondary hover:text-primary">
                Sign in
              </a>
            </Link>
          </div>
        </div>
        </form>
      </main>
    </div>
  );
}
