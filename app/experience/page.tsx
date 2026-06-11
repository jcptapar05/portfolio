import ExperienceTimeline from "@/components/_pages/experience/ExperienceTimeline";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Julius Tapar's professional journey — from Service Engineer to Full-Stack Developer. 10+ years in tech across enterprise software, web development, and system architecture.",
};

const Page = () => {
  return (
    <div className="w-full pt-14">
      <ExperienceTimeline />
    </div>
  );
};

export default Page;
