/* eslint-disable @next/next/no-img-element */
import EmailSVG from "@/components/icons/EmailSVG";
import GitSVG from "@/components/icons/GitSVG";
import LinkedInSVG from "@/components/icons/LinkedInSVG";
import PlaySVG from "@/components/icons/PlaySVG";
import React from "react";

const Slider = () => {
 return (
  <div className="w-screen h-[87vh] flex justify-center items-center">
   <div className="max-w-[800px] text-center px-6 md:px-0">
    <div className="max-h-[200px] max-w-[200px] rounded-full mx-auto mb-6">
     <img
      src="./juls.jpeg"
      className="h-full w-full rounded-full"
      alt=""
     />
    </div>
    <h1 className="text-4xl mb-4 uppercase font-semibold">Julius Tapar</h1>
    <p className="text-lg">
     Frontend, Full-stack MERN, NextJs & Mobile Developer
    </p>
    <div className="flex text-center gap-5 mt-4 justify-center">
     <a
      href="mailto:jcptapar05@gmail.com"
      className="hover:text-teal-500"
     >
      <EmailSVG></EmailSVG>
     </a>
     <a
      href="https://www.linkedin.com/in/julius-tapar-48470a145/"
      target="_blank"
      className="hover:text-teal-500"
     >
      <LinkedInSVG></LinkedInSVG>
     </a>
     <a
      href="https://github.com/jcptapar05/myprofile"
      target="_blank"
      className="hover:text-teal-500"
     >
      <GitSVG></GitSVG>
     </a>
    </div>
   </div>
  </div>
 );
};

export default Slider;
