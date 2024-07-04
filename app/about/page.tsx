import React from "react";

type pageType = {
 name?: string;
};

const page: React.FC<pageType> = ({ name }) => {
 return (
  <div className="w-screen h-[87vh] flex justify-center items-center">
   <div className="max-w-[800px] px-6 md:px-0">
    <h2 className="capitalize text-2xl font-bold">About me</h2>
    <p className="tracking-wider	">
     My name is
     <i> Julius Tapar.</i> I'm from Philippines. Associate Graduated in Computer
     Science.
    </p>
    <p className="mt-2 tracking-wider">
     I am an experienced frontend developer with expertise in React.js, Next.js,
     Vue.js, Express.js, Laravel, MySQL, Prisma, Redux Toolkit, Zustand, Shadcn,
     and various CSS frameworks.
    </p>
    <p className="mt-2 tracking-wider">
     I am keen on learning WebRTC and blockchain technology.
    </p>
    <p className="mt-2 tracking-wider">I hope you enjoy my website.</p>
   </div>
  </div>
 );
};

export default page;
