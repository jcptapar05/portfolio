/* eslint-disable @next/next/no-img-element */
import EmailSVG from "@/components/icons/EmailSVG";
import GitSVG from "@/components/icons/GitSVG";
import LinkedInSVG from "@/components/icons/LinkedInSVG";
import React from "react";

const Slider = () => {
  return (
    <div className="w-screen h-[87vh] flex justify-center items-center">
      <div className="max-w-[800px] text-center px-6 md:px-0">
        <div className="max-h-[200px] max-w-[200px] rounded-full mx-auto mb-6 overflow-hidden">
          <img
            src="./juls.jpeg"
            className="h-full w-full object-cover rounded-full"
            alt="Julius Tapar"
          />
        </div>

        <h1 className="text-4xl mb-3 capitalize font-semibold">Julius Tapar</h1>

        <p className="text-lg leading-relaxed">
          Frontend & Full-Stack Developer specializing in React, Next.js, and MERN. Building scalable web applications,
          real-time systems with WebRTC & Agora, and exploring Go backend services and Solidity smart contracts.
        </p>

        <div className="flex gap-5 mt-5 justify-center">
          <a
            href="mailto:jcptapar05@gmail.com"
            className="hover:text-teal-500 transition"
          >
            <EmailSVG />
          </a>

          <a
            href="https://www.linkedin.com/in/julius-tapar-48470a145/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition"
          >
            <LinkedInSVG />
          </a>

          <a
            href="https://github.com/jcptapar05"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition"
          >
            <GitSVG />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
