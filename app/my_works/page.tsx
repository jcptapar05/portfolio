import React from "react";
import type { Metadata } from "next";
import WorksPageClient from "@/components/_pages/my_works/WorksPageClient";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Explore Julius Tapar's portfolio of featured web applications, full-stack systems, headless e-commerce storefronts, and blockchain/Web3 integrations.",
};

export default function Page() {
  return <WorksPageClient />;
}
