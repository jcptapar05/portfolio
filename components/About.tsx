import React from "react";

const About = () => {
 return (
  <div className="bg-slate-100 py-28 w-screen z-[999] relative flex justify-center items-center">
   <div className="max-w-[800px] text-center px-10 md:px-0">
    <h2 className="text-5xl font-bold text-teal-800 mb-6">About me</h2>
    <p className="mb-6 leading-7">
     As a frontend developer with over five years of experience, I specialize in
     building dynamic and responsive web applications using Next.js, React.js,
     Vue.js, and Express. My expertise in these frameworks enables me to create
     seamless and efficient user interfaces that enhance user experiences.
    </p>
    <p className="leading-7">
     I am particularly passionate about real-time communication technologies,
     focusing on WebRTC. This allows me to develop innovative applications for
     real-time data transfer and video conferencing, ensuring high-performance
     and interactive user experiences.
    </p>
   </div>
  </div>
 );
};

export default About;
