/* eslint-disable @next/next/no-img-element */
import React from "react";

const Contact = () => {
 return (
  <div className="h-5/6 w-screen z-[999] relative flex flex-col md:flex-row justify-center items-center bg-teal-800">
   <div className="w-screen md:w-1/2 h-full hidden md:flex">
    <img
     src="/dog.jpg"
     alt=""
     className="w-full h-full object-cover"
    />
   </div>

   <div className="w-screen md:w-1/2 p-20">
    <h2 className="text-5xl font-bold text-yellow-400 mb-6">Contact</h2>
    <p className="text-white mb-2">Phone: +63 939 009 0500</p>
    <p className="text-white mb-2">Email: jcptapar05@gmail.com</p>
   </div>
  </div>
 );
};

export default Contact;
