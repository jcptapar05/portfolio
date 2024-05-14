/* eslint-disable @next/next/no-img-element */
import React from "react";

const Banner = () => {
 return (
  <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row justify-between bg-teal-800 text-white relative">
   <div className="w-full h-full md:w-1/2 flex justify-center items-center">
    <div className="px-10 text-center md:text-left">
     <h3 className="text-4xl text-yellow-400">Hi, I&apos;m</h3>
     <h1 className="text-8xl font-bold my-4">Julius Tapar</h1>
     <h2>Frontend Developer</h2>
    </div>
   </div>
   <div className="hidden md:flex w-full md:w-1/2 h-full">
    <div className="w-full h-full">
     <img
      src="/main.jpg"
      alt=""
      className="w-1/2 h-full object-cover fixed object-left"
     />
    </div>
   </div>
  </div>
 );
};

export default Banner;
