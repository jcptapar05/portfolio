import Forms from "@/components/_pages/contact/forms/Forms";
import React from "react";

const page = () => {
 return (
  <div className="container mx-auto h-[85vh] flex justify-between items-center">
   <div className="w-1/2">
    <p>Contact Me</p>
   </div>
   <div className="w-1/2 p-6 bg-gray-200 rounded-md">
    <Forms></Forms>
   </div>
  </div>
 );
};

export default page;
