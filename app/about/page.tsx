import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Julius Tapar — a Frontend and Full-Stack Developer from the Philippines with experience in React, Next.js, MERN, real-time systems, and more.",
};

const Page = () => {
  return (
    <section
      aria-labelledby="about-heading"
      className="w-full min-h-screen flex justify-center items-center pt-14"
    >
      <article className="max-w-2xl w-full px-6 md:px-8 py-20 space-y-7">
        {/* Section label */}
        <p className="text-highlight text-xs font-semibold uppercase tracking-widest">
          About
        </p>

        <h1
          id="about-heading"
          className="text-2xl sm:text-3xl font-bold tracking-tight"
        >
          About Me
        </h1>

        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            Hi, I&apos;m <span className="text-foreground font-medium italic">Julius Tapar</span>, a Frontend and
            Full-Stack Developer from the Philippines and an Associate graduate
            in Computer Science.
          </p>

          <p>
            I specialize in building modern web applications using React.js,
            Next.js, and the MERN stack, focusing on responsive interfaces,
            performance, and scalable architecture.
          </p>

          <p>
            My experience includes working with technologies such as React.js,
            Next.js, Vue.js, Express.js, MySQL, Prisma, Redux Toolkit, Zustand,
            Shadcn UI, and modern CSS frameworks.
          </p>

          <p>
            I also have experience building real-time applications using WebRTC
            and Agora, developing backend services with Golang, and exploring
            blockchain development with Solidity.
          </p>

          <p>
            Additionally, I have basic Linux knowledge for server setup and
            deployment, allowing me to deploy and manage web applications in
            production environments.
          </p>

          <p>
            I enjoy learning new technologies, building real-world projects, and
            continuously improving my development skills.
          </p>
        </div>
      </article>
    </section>
  );
};

export default Page;
