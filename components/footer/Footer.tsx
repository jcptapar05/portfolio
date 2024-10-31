import React from "react";

const Footer = () => {
 return (
  <div className="text-center w-screen py-4 px-0">
   <p className="p-0">&copy; Copyright {new Date().getFullYear() }</p>
  </div>
 );
};

export default Footer;
