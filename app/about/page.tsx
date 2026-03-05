import React from "react";

const Page = () => {
  return (
    <div className="w-screen min-h-[87vh] flex justify-center items-center">
      <div className="max-w-[800px] px-6 md:px-0 space-y-5">
        <h2 className="capitalize text-2xl font-bold">About Me</h2>

        <p className="tracking-wider">
          Hi, I'm <i>Julius Tapar</i>, a Frontend and Full-Stack Developer from the Philippines and an Associate
          graduate in Computer Science.
        </p>

        <p className="tracking-wider">
          I specialize in building modern web applications using React.js, Next.js, and the MERN stack, focusing on
          responsive interfaces, performance, and scalable architecture.
        </p>

        <p className="tracking-wider">
          My experience includes working with technologies such as React.js, Next.js, Vue.js, Express.js, MySQL, Prisma,
          Redux Toolkit, Zustand, Shadcn UI, and modern CSS frameworks.
        </p>

        <p className="tracking-wider">
          I also have experience building real-time applications using WebRTC and Agora, developing backend services
          with Golang, and exploring blockchain development with Solidity.
        </p>

        <p className="tracking-wider">
          Additionally, I have basic Linux knowledge for server setup and deployment, allowing me to deploy and manage
          web applications in production environments.
        </p>

        <p className="tracking-wider">
          I enjoy learning new technologies, building real-world projects, and continuously improving my development
          skills.
        </p>
      </div>
    </div>
  );
};

export default Page;
