import { Cards } from "@/components/_pages/my_works/cards/Cards";
import React from "react";

const page = () => {
  const data = [
    {
      img: "./hris.png",
      lang: ["Vue", "MySQL", "Golang"],
      url: "https://hris.cda.gov.ph/login",
    },
    {
      img: "./shopify-liquid-1.png",
      lang: ["Shopify", "Liquid"],
      url: "https://quickstart-220e7d16.myshopify.com/",
    },
    {
      img: "./shopify-liquid-2.png",
      lang: ["Shopify", "Liquid"],
      url: "https://brandy-1604017349.myshopify.com/",
    },
    {
      img: "./shopify1.png",
      lang: ["NextJs", "Shopify"],
      url: "https://headlessshopifynext.vercel.app/",
    },
    {
      img: "./shopify2.png",
      lang: ["NextJs", "Shopify"],
      url: "https://ccooffee-eight.vercel.app/",
    },
    {
      img: "./pokemon.PNG",
      lang: ["NextJs"],
      url: "https://pokemonapp-dusky.vercel.app/",
    },
    {
      img: "./1cd.JPG",
      lang: ["NextJs", "MySQL", "ExpressJs"],
      url: "https://www.1clickdesign.com/",
    },
    {
      img: "./1cdplatform.JPG",
      lang: ["NextJs", "MySQL", "ExpressJs"],
      url: "https://platform.1clickdesign.com/",
    },
    {
      img: "./mta.JPG",
      lang: ["NextJs", "MySQL", "ExpressJs"],
      url: "https://mytoparts.com/",
    },
    {
      img: "./homepage-banner.jpg",
      lang: ["WordPress", "Bootstrap"],
      url: "https://ssatalentsolutions.com/",
    },
    {
      img: "./ssa.JPG",
      lang: ["Wordpress", "Bootstrap", "JQuery"],
      url: "https://ssagroup.com/",
    },
    {
      img: "./signInside.jpg",
      lang: ["vuejs", "MySQL", "laravel"],
      url: "https://lms.ssavantlearning.com/login",
    },
    {
      img: "./1681205188-banner.jpg",
      lang: ["vuejs", "MySQL", "laravel"],
      url: "https://umrahdiy.com/",
    },
    {
      img: "./wpa.JPG",
      lang: ["Wordpress", "Joomla"],
      url: "https://www.canadianlawyermag.com/events",
    },
    {
      img: "./wpa_2.JPG",
      lang: ["Wordpress", "Joomla"],
      url: "https://wealthprofessionalawards.ca/",
    },
  ];

  return (
    <div className="container py-10 gap-4 grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, i) => (
        <Cards
          key={i}
          img={item.img}
          lang={item.lang}
          url={item.url}
        ></Cards>
      ))}
    </div>
  );
};

export default page;
