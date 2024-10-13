import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">Keep your body Fit and healthy</h1>
        <p className="text-white xl:text-xl">
        Transform your body, elevate your mind, and unleash your potential with our innovative fitness programs. Join a community of like-minded individuals
        </p>
        <CountDown/>
        <button className="bg-secondary text-black font-bold rounded-md py-3 px-6">Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full">
        <Image src="/slide4.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
