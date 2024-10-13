"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "Transform your body, elevate your mind, ",
    image: "/slide7.jpg",
  },
  {
    id: 2,
    title: " with our innovative fitness programs.",
    image: "/slide9.jpg", 
  },
  {
    id: 3,
    title: "Join a community of like-minded individuals.",
    image: "/slide8.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-7rem)] lg:flex-row bg-primary">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-secondary font-bold">
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <button className="bg-secondary text-black py-4 px-8">Get the App</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
