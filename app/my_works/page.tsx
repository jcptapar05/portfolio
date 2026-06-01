import { Cards } from "@/components/_pages/my_works/cards/Cards";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Works",
  description:
    "A collection of projects built by Julius Tapar — covering HRIS systems, Shopify storefronts, Next.js apps, WordPress sites, and more.",
};

interface Project {
  img: string;
  lang: string[];
  url: string;
  title: string;
}

const data: Project[] = [
  {
    img: "./bsnft.PNG",
    lang: ["Next.js", "Typescript", "Tailwind", "Ethers.js","Hardhat"],
    url: "https://activities-69jz.vercel.app/marketplace",
    title: "Bookstore NFT",
  },
  {
    img: "./hris.png",
    lang: ["Vue", "MySQL", "Golang"],
    url: "https://hris.cda.gov.ph/login",
    title: "CDA HRIS",
  },
  {
    img: "./shopify-liquid-1.png",
    lang: ["Shopify", "Liquid"],
    url: "https://quickstart-220e7d16.myshopify.com/",
    title: "Shopify Liquid Theme 1",
  },
  {
    img: "./shopify-liquid-2.png",
    lang: ["Shopify", "Liquid"],
    url: "https://brandy-1604017349.myshopify.com/",
    title: "Shopify Liquid Theme 2",
  },
  {
    img: "./shopify1.png",
    lang: ["Next.js", "Shopify"],
    url: "https://headlessshopifynext.vercel.app/",
    title: "Headless Shopify Next.js",
  },
  {
    img: "./shopify2.png",
    lang: ["Next.js", "Shopify"],
    url: "https://ccooffee-eight.vercel.app/",
    title: "Coffee Shop Storefront",
  },
  {
    img: "./pokemon.PNG",
    lang: ["Next.js"],
    url: "https://pokemonapp-dusky.vercel.app/",
    title: "Pokémon App",
  },
  {
    img: "./1cd.JPG",
    lang: ["Next.js", "MySQL", "Express.js"],
    url: "https://www.1clickdesign.com/",
    title: "1ClickDesign",
  },
  {
    img: "./1cdplatform.JPG",
    lang: ["Next.js", "MySQL", "Express.js"],
    url: "https://platform.1clickdesign.com/",
    title: "1ClickDesign Platform",
  },
  {
    img: "./mta.JPG",
    lang: ["Next.js", "MySQL", "Express.js"],
    url: "https://mytoparts.com/",
    title: "MyToParts",
  },
  {
    img: "./homepage-banner.jpg",
    lang: ["WordPress", "Bootstrap"],
    url: "https://ssatalentsolutions.com/",
    title: "SSA Talent Solutions",
  },
  {
    img: "./ssa.JPG",
    lang: ["WordPress", "Bootstrap", "jQuery"],
    url: "https://ssagroup.com/",
    title: "SSA Group",
  },
  {
    img: "./signInside.jpg",
    lang: ["Vue.js", "MySQL", "Laravel"],
    url: "https://lms.ssavantlearning.com/login",
    title: "SSAvant LMS",
  },
  {
    img: "./1681205188-banner.jpg",
    lang: ["Vue.js", "MySQL", "Laravel"],
    url: "https://umrahdiy.com/",
    title: "UmrahDIY",
  },
  {
    img: "./wpa.JPG",
    lang: ["WordPress", "Joomla"],
    url: "https://www.canadianlawyermag.com/events",
    title: "Canadian Lawyer Mag Events",
  },
  {
    img: "./wpa_2.JPG",
    lang: ["WordPress", "Joomla"],
    url: "https://wealthprofessionalawards.ca/",
    title: "Wealth Professional Awards",
  },
];

const Page = () => {
  return (
    <div className="w-full pt-14">
      <section
        aria-labelledby="works-heading"
        className="container mx-auto px-6 py-16"
      >
        {/* Header */}
        <header className="mb-10">
          <p className="text-highlight text-xs font-semibold uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h1
            id="works-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            My Works
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            A selection of projects I&apos;ve built across different stacks and
            domains.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((item, i) => (
            <Cards
              key={i}
              img={item.img}
              lang={item.lang}
              url={item.url}
              title={item.title}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
