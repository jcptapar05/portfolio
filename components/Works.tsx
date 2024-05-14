/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

const Works = () => {
 const [works, setWorks] = useState([
  {
   link: "https://www.1clickdesign.com/",
   photo: "/1cd.JPG",
   tags: ["NextJs 13", "MySQL"],
  },
  {
   link: "https://platform.1clickdesign.com/",
   photo: "/1cdplatform.JPG",
   tags: ["nextJs 13", "expressJs", "mySQL"],
  },
  {
   link: "https://mytoparts.com/",
   photo: "/mta.JPG",
   tags: ["NextJs 13", "mySQL"],
  },
  {
   link: "https://ssagroup.com/",
   photo: "/ssa.JPG",
   tags: ["Wordpress"],
  },
  {
   link: "https://lms.ssavantlearning.com/login",
   photo:
    "https://lms.ssavantlearning.com/theme/images/signInside.jpg?fbbf515c894718607aef45ee6c38938c",
   tags: ["Laravel", "Vue"],
  },
  {
   link: "https://umrahdiy.com/",
   photo: "https://umrahdiy.com/public/images/1681205188-banner.jpg",
   tags: ["Laravel", "Vue"],
  },
  {
   link: "https://www.canadianlawyermag.com/events",
   photo:
    "https://cdn-res.keymedia.com/cdn-cgi/image/f=auto/https://cdn-res.keymedia.com/cms/images/ca/120/0379_638509604634866665.jpg",
   tags: ["Wordpress", "Joomla"],
  },
  {
   link: "https://wealthprofessionalawards.ca/",
   photo: "wpa.JPG",
   tags: ["Wordpress", "Joomla"],
  },
  {
   link: "https://ssatalentsolutions.com/",
   photo:
    "https://ssatalentsolutions.com/wp-content/uploads/2023/06/homepage-banner.jpg",
   tags: ["Wordpress", "Joomla"],
  },
 ]);

 return (
  <div className="bg-white py-20 w-screen z-[999] relative">
   <div className="mb-20 w-screen text-center">
    <h2 className="text-5xl font-bold text-teal-800 mb-6">Works</h2>
   </div>
   <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {works.map((work, index) => (
     <div
      key={index}
      className="bg-slate-50 rounded-lg"
     >
      <a
       href={work.link}
       target="_blank"
       rel="noopener noreferrer"
      >
       <img
        src={work.photo}
        alt=""
        className="w-full h-[400px] object-cover rounded-xl hover:scale-[1.02] transition-all hover:shadow-xl cursor-pointer"
       />
       <div className="flex gap-2 mt-2 p-2">
        {work.tags.map((tag, i) => (
         <div
          key={i}
          className="rounded-xl text-white text-xs bg-teal-800 p-1.5"
         >
          {tag}
         </div>
        ))}
       </div>
      </a>
     </div>
    ))}
   </div>
  </div>
 );
};

export default Works;
